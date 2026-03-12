# Waves Website - Updates

*Generated: 12 March 2026 from Claude.ai conversation*
*Branch: antigravity*
*Status: PENDING*

---

## P0 — Do Now

---

## P1 — Next Session

### 2. Headless customer accounts — Phase 1 (Auth layer)

Build the login/signup modal and `/account` route. Phase 1 is auth only — no order history yet (that's Phase 2, P1 of the following session).

**New file: `src/lib/customer.ts`**

Create Shopify customer auth helpers using the Storefront API:

```typescript
// Customer auth via Shopify Storefront API
// All mutations use the public Storefront token — no Admin API needed.

export async function customerCreate(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ customer: { id: string } | null; errors: { field: string; message: string }[] }> {
  const data = await shopifyFetch<{ customerCreate: { customer: { id: string } | null; customerUserErrors: { field: string[]; message: string }[] } }>(`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `, { input: { email, password, firstName, lastName } });
  return {
    customer: data.customerCreate.customer,
    errors: data.customerCreate.customerUserErrors.map(e => ({ field: e.field.join('.'), message: e.message })),
  };
}

export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{ accessToken: string | null; expiresAt: string | null; errors: { message: string }[] }> {
  const data = await shopifyFetch<{ customerAccessTokenCreate: { customerAccessToken: { accessToken: string; expiresAt: string } | null; customerUserErrors: { message: string }[] } }>(`
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { message }
      }
    }
  `, { input: { email, password } });
  return {
    accessToken: data.customerAccessTokenCreate.customerAccessToken?.accessToken ?? null,
    expiresAt: data.customerAccessTokenCreate.customerAccessToken?.expiresAt ?? null,
    errors: data.customerAccessTokenCreate.customerUserErrors,
  };
}

export async function customerAccessTokenDelete(accessToken: string): Promise<void> {
  await shopifyFetch(`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
      }
    }
  `, { customerAccessToken: accessToken });
}

export async function getCustomer(accessToken: string): Promise<{ id: string; email: string; firstName: string; lastName: string } | null> {
  const data = await shopifyFetch<{ customer: { id: string; email: string; firstName: string; lastName: string } | null }>(`
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id email firstName lastName
      }
    }
  `, { customerAccessToken: accessToken });
  return data.customer;
}
```

**New file: `src/lib/auth-store.ts`**

Zustand store for customer session (mirrors cart-store.ts pattern):

```typescript
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customerAccessTokenCreate, customerAccessTokenDelete, getCustomer, customerCreate } from "./customer";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  customer: Customer | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        const result = await customerAccessTokenCreate(email, password);
        if (result.accessToken) {
          const customer = await getCustomer(result.accessToken);
          set({ accessToken: result.accessToken, customer, loading: false });
          return true;
        }
        set({ loading: false, error: result.errors[0]?.message ?? "Login failed" });
        return false;
      },
      signup: async (email, password, firstName, lastName) => {
        set({ loading: true, error: null });
        const result = await customerCreate(email, password, firstName, lastName);
        if (result.customer) {
          const tokenResult = await customerAccessTokenCreate(email, password);
          if (tokenResult.accessToken) {
            const customer = await getCustomer(tokenResult.accessToken);
            set({ accessToken: tokenResult.accessToken, customer, loading: false });
            return true;
          }
        }
        set({ loading: false, error: result.errors[0]?.message ?? "Signup failed" });
        return false;
      },
      logout: async () => {
        const { accessToken } = get();
        if (accessToken) await customerAccessTokenDelete(accessToken);
        set({ customer: null, accessToken: null });
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: "waves-auth",
      partialize: (state) => ({ accessToken: state.accessToken, customer: state.customer }),
    }
  )
);
```

**New file: `src/components/AuthModal.tsx`**

Waves-branded login/signup modal. Two modes: "login" and "signup". Sits above everything via portal. Style matches the existing brand system (cream background, blue primary, DM type family, coral CTA).

```
- Modal overlay: bg-black/40 backdrop-blur-sm
- Modal card: bg-surface rounded-2xl p-8 max-w-md w-full mx-4
- Title: DM Serif Display, text-3xl text-primary
- Inputs: border border-primary/20 rounded-lg px-4 py-3 font-sans text-sm focus:border-primary focus:outline-none w-full
- Submit button: same coral rounded-full style as Add to Cart
- Toggle (Login/Signup): font-sans text-sm text-primary/60 hover:text-primary
- Error: font-mono text-xs text-accent (coral)
- Close: absolute top-4 right-4, × character, text-primary/40 hover:text-primary/80
```

State: controlled by `mode` ("login" | "signup") and `isOpen` prop passed from parent.

Fields for login: Email, Password
Fields for signup: First name, Last name, Email, Password

On successful login/signup: close modal, no redirect.

**Update `src/components/Header.tsx`**

Add account icon/link to the right of the cart icon. Behaviour:
- If logged in: show customer first name (truncated to 10 chars) + small person icon, linking to `/account`
- If logged out: show person icon only, clicking opens `AuthModal`

Import and wire `useAuthStore` and `AuthModal`.

**New page: `src/app/account/page.tsx`**

Minimal `/account` page for Phase 1 — just a welcome state and logout. Order history is Phase 2.

```
Layout: pt-24 px-6, max-w-2xl mx-auto
Heading: "Your account" — DM Serif Display, text-4xl
Subheading: "Hello, {firstName}." — DM Sans, text-xl font-light text-primary/70
Section: "Orders" — placeholder card: "Order history coming soon." font-mono text-sm text-primary/40 border border-primary/10 rounded-lg p-6
Logout button: text-only, font-sans text-sm text-primary/50 hover:text-primary, calls logout() from useAuthStore, redirects to /
Redirect: if no accessToken in auth store, redirect to / (use Next.js redirect())
```

---

## P2 — When Time Allows

### 3. Page transition animations

Add Framer Motion page transitions between routes. Wrap page content in `PageTransition` component (already exists at `src/components/PageTransition.tsx` — check if it's wired into `layout.tsx`, and if not, add it).

Standard pattern: `opacity: 0 → 1` on enter, `y: 10 → 0` on enter. Duration 0.3s ease-out.

---

## Completed

- [x] **Progressive gallery filtering via alt text tags:** Added `src/lib/image-filter.ts` to parse tags `[shade|base|cable]` and filter gallery depending on current product form step. Update Shopify alt-texts to test.

- [x] **Redesigned Configurator UI:** Added vertical accent bars and card-style buttons for Base/Cable selection.
- [x] **Smart Variant Subtitles:** Implemented `src/lib/option-content.ts` to map Shopify strings to curated labels and subtitles.
- [x] **Improved Gallery Switching:** Upgraded shade selection to match specific variant image URLs before falling back to alt-text.
- [x] Shopify Storefront API connected — single source of truth
- [x] Native category metafield colour swatches (hex from Shopify option values)
- [x] `descriptionHtml` rich text rendering
- [x] Admin API scripts removed — public Storefront token only
- [x] 3-step configurator (Shade → Base → Cable) with step dots + back navigation
- [x] Selection summary chips
- [x] "Made to order · Uniquely yours" tagline in configurator
- [x] Mobile CSS Grid blowout fixed on product page
- [x] Typography contrast fixes — hint text, legends, eyebrow labels
- [x] h1–h6 baseline remapped to @layer base (Tailwind override fix)
- [x] WaveMark enlarged on homepage hero
- [x] Mobile navigation clipping bug fixed + body scroll lock
- [x] Unused components removed (PointCloudHero etc.)
- [x] Notion integration connected (contact + project brief forms)
- [x] Transparent PNG logos updated