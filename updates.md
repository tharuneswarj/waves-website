# Waves Website — Updates

*Branch: master*
*Generated: 13 March 2026*
*Status: COMPLETE*

---

## P0 — Fix Now (two bugs)

### 1. AuthModal positioning — modal not centred on non-homepage pages

**Root cause:** `AuthModal` renders inside `<header>`, which is itself `position: fixed`. A `fixed` child of a `fixed` parent anchors to the parent's containing block on some browsers — not the full viewport. On the homepage this accidentally looks correct; on all other pages the modal floats toward the top of the screen.

**Fix:** Render AuthModal via a React portal directly into `document.body`, outside the header entirely.

**Update `src/components/AuthModal.tsx`** — replace the entire file:

```tsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/lib/auth-store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mounted, setMounted] = useState(false);

  const { login, signup, loading, error, clearError } = useAuthStore();

  // Portal requires the DOM to be available
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    let success = false;
    if (mode === "login") {
      success = await login(email, password);
    } else {
      success = await signup(email, password, firstName, lastName);
    }

    if (success) {
      onClose();
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    clearError();
  };

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-primary/40 transition-colors hover:text-primary/80"
          aria-label="Close"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>

        <h2 className="mb-6 font-serif text-3xl text-primary">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
          />

          {error && (
            <div className="font-mono text-xs text-accent">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="font-sans text-sm font-medium text-primary/60 transition-colors hover:text-primary"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
```

**Key changes from original:**
- Added `import { createPortal } from "react-dom"`
- Added `mounted` state guard (portals need the DOM available)
- Added body scroll lock inside this component (removed from Header dependency)
- Wrapped modal in `createPortal(modal, document.body)` — renders outside `<header>` entirely
- `z-[200]` to ensure it sits above everything including the header (`z-50`) and cart drawer (`z-50`)
- Clicking the backdrop (not the card) also closes the modal

---

### 2. Checkout not pre-populating — customer token not passed to Shopify

**Root cause:** The `associateCustomerWithCart` function was added to `shopify.ts` but the CartDrawer checkout button is still a plain `<a href>` tag. It navigates immediately without calling the association function first.

**Update `src/components/CartDrawer.tsx`** — three changes:

**Change 1** — add imports at the top:
```typescript
import { useAuthStore } from "@/lib/auth-store";
import { associateCustomerWithCart } from "@/lib/shopify";
```

**Change 2** — add `accessToken` from auth store inside the component, after the existing store destructuring:
```typescript
const { accessToken } = useAuthStore();
```

**Change 3** — replace the checkout `<a>` tag with a button:

Find this:
```tsx
<a
  href={cart?.checkoutUrl ?? "#"}
  className="block w-full rounded-full bg-accent py-3.5 text-center font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark"
>
  Checkout
</a>
```

Replace with:
```tsx
<button
  type="button"
  onClick={async () => {
    if (!cart?.checkoutUrl) return;
    if (cart.id && accessToken) {
      try {
        await associateCustomerWithCart(cart.id, accessToken);
      } catch {
        // Non-fatal — proceed to checkout even if association fails
      }
    }
    window.location.href = cart.checkoutUrl;
  }}
  className="block w-full rounded-full bg-accent py-3.5 text-center font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark"
>
  Checkout
</button>
```

**What this does:** If the customer is logged in, it silently calls `cartBuyerIdentityUpdate` on the Shopify cart before redirecting. Shopify then pre-fills name, email, and saved addresses on the checkout page. If the customer is not logged in (no `accessToken`), it skips the association and goes straight to checkout as before. The `try/catch` means a network failure on the association step never blocks the customer from checking out.

---

### ALso-  favicon — update to Waves favicon

Currently using Next.js default favicon. The `Favicon_Logo.png` already exists at `/public/logos/Favicon_Logo.png`.

**Update `src/app/layout.tsx`** — add icons to the metadata export:

```typescript
export const metadata: Metadata = {
  // ... existing fields ...
  icons: {
    icon: "/logos/Favicon_Logo.png",
    apple: "/logos/Favicon_Logo.png",
  },
};
```
---



## Completed

- [x] AuthModal portal fix — render via `createPortal` into `document.body` (13 March 2026)
- [x] Checkout pre-populate — CartDrawer calls `associateCustomerWithCart` before redirect (13 March 2026)
- [x] sitemap.ts — `src/app/sitemap.ts` (13 March 2026)
- [x] robots.ts — `src/app/robots.ts` (13 March 2026)
- [x] JSON-LD structured data — product pages (13 March 2026)
- [x] JSON-LD structured data — homepage Organisation (13 March 2026)
- [x] Fix OG image double-underscore typo in layout.tsx (13 March 2026)
- [x] Checkout handoff — associateCustomerWithCart added to shopify.ts (13 March 2026)
- [x] Favicon — added icons to layout.tsx metadata (13 March 2026)
- [x] Headless customer accounts — Phase 1 (auth modal, Zustand store, protected routing)
- [x] Headless customer accounts — Phase 2 (orders, order detail pages, address book, account details, password change)
- [x] Progressive gallery filtering via alt text tags
- [x] Redesigned Configurator UI
- [x] Smart Variant Subtitles
- [x] Improved gallery switching
- [x] Shopify Storefront API — single source of truth
- [x] Native colour swatches from Shopify option metafields
- [x] 3-step configurator with step dots + back navigation
- [x] Selection summary chips + tagline
- [x] Mobile fixes — grid, nav, scroll lock
- [x] Typography fixes globally
- [x] WaveMark on homepage hero
- [x] Notion integration
- [x] PageTransition wired into layout.tsx
- [x] Per-page metadata and OpenGraph on all routes
- [x] Real product photography live in Shopify