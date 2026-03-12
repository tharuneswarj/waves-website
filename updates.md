# Waves Website — Updates

*Branch: master*
*Generated: 13 March 2026*
*Status: COMPLETE*

---

## P0 — Do Now (SEO)

### 1. sitemap.xml

**New file: `src/app/sitemap.ts`**

```typescript
import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/shopify";
import { getAllProjectSlugs } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://waves.company";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/shop`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/studio`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((p) => ({
      url: `${base}/shop/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));
  } catch {
    // Shopify unreachable at build time — skip product routes
  }

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${base}/studio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...projectRoutes];
}
```

---

### 2. robots.txt

**New file: `src/app/robots.ts`**

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/account/"],
    },
    sitemap: "https://waves.company/sitemap.xml",
  };
}
```

---

### 3. JSON-LD structured data — product pages

Add inside `src/app/shop/[handle]/page.tsx`. This enables rich results in Google (price shown in search listings).

Add this function before the default export:

```typescript
function buildProductJsonLd(product: ShopifyProduct, handle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `https://waves.company/shop/${handle}`,
    brand: {
      "@type": "Brand",
      name: "Waves Company",
    },
    image: product.featuredImage?.url ? [product.featuredImage.url] : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Waves Company",
      },
    },
  };
}
```

Then inside the `ProductPage` JSX, add as first child of `<main>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product, handle)) }}
/>
```

Also update `generateMetadata` to include the product image in OG (so social shares show the lamp, not the logo):

```typescript
return {
  title: `${product.title} — Waves Company`,
  description: product.description.slice(0, 160),
  openGraph: {
    title: `${product.title} — Waves Company`,
    description: product.description.slice(0, 160),
    images: product.featuredImage
      ? [{ url: product.featuredImage.url, width: 1200, height: 1600, alt: product.featuredImage.altText || product.title }]
      : undefined,
  },
};
```

---

### 4. JSON-LD structured data — homepage (Organisation)

Add inside `src/app/page.tsx` as first child of `<main>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Waves Company",
      url: "https://waves.company",
      logo: "https://waves.company/logos/Cream_and_Blue_Logo_v2.png",
      description: "Algorithmically crafted lighting objects. Designed through computation, made by hand.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@waves.company",
        contactType: "customer service",
      },
      sameAs: ["https://instagram.com/waves_company_"],
    }),
  }}
/>
```

---

### 5. Fix OG image reference in layout.tsx

The current OG image path has a double underscore typo (`Cream_and_Blue__Logo.png`). Fix it:

In `src/app/layout.tsx`, update the images array:

```typescript
// Change:
url: "/logos/Cream_and_Blue__Logo.png",

// To:
url: "/logos/Cream_and_Blue_Logo_v2.png",
width: 1200,
height: 630,
alt: "Waves Company",
```

---

### 6. Fix product image alt text — raw tag strings visible to screen readers

On the live site, gallery image alt attributes contain raw tag strings like `[chalk]` and `[chalk | printed | Black ]`. These come from Shopify alt text fields that have the filter tags but nothing else. Screen readers read these out loud. Fix in Shopify Admin for every product image — the alt text should be descriptive first, with tags at the end in brackets:

```
Ripple lamp in Chalk shade [chalk]
Ripple lamp in Smoke shade [smoke]
Ripple lamp in Sand shade, printed base, black cable [sand|printed|black]
```

This is a Shopify Admin task, not a code task. But it's worth flagging as a fix — it affects accessibility and image SEO simultaneously.

---

## P1 — Before domain cutover

### 7. Checkout handoff — associate customer token with cart

When a logged-in customer clicks checkout, Shopify doesn't know who they are. They have to re-enter details on the checkout page. Fix by calling `cartBuyerIdentityUpdate` before redirectring.

**Update `src/lib/shopify.ts`** — add this function:

```typescript
export async function associateCustomerWithCart(
  cartId: string,
  customerAccessToken: string
): Promise<void> {
  await shopifyFetch(
    `mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart { id }
        userErrors { field message }
      }
    }`,
    { cartId, buyerIdentity: { customerAccessToken } }
  );
}
```

**Update `src/components/CartDrawer.tsx`** — find the checkout button handler and update it:

```typescript
// Import at top:
import { useAuthStore } from "@/lib/auth-store";
import { associateCustomerWithCart } from "@/lib/shopify";

// In component:
const { accessToken } = useAuthStore();

// Update the checkout click handler (wherever checkoutUrl navigation happens):
const handleCheckout = async () => {
  if (cart?.id && accessToken) {
    await associateCustomerWithCart(cart.id, accessToken);
  }
  window.location.href = cart.checkoutUrl;
};
```

Replace the existing checkout `<a>` tag or button with a `<button onClick={handleCheckout}>`.

---

### 8. favicon — update to Waves favicon

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

- [x] sitemap.ts — `src/app/sitemap.ts` (13 March 2026)
- [x] robots.ts — `src/app/robots.ts` (13 March 2026)
- [x] JSON-LD structured data — product pages (13 March 2026)
- [x] JSON-LD structured data — homepage Organisation (13 March 2026)
- [x] Fix OG image double-underscore typo in layout.tsx (13 March 2026)
- [x] Fix product image alt text — Shopify Admin task (flagged, not a code change)
- [x] Checkout handoff — associateCustomerWithCart + CartDrawer handler (13 March 2026)
- [x] Favicon — added icons to layout.tsx metadata (13 March 2026)
- [x] Headless customer accounts — Phase 1 (auth modal, Zustand store, protected routing)
- [x] Headless customer accounts — Phase 2 (orders, order detail pages, address book, account details, password change)
- [x] Progressive gallery filtering via alt text tags (`src/lib/image-filter.ts`)
- [x] Redesigned Configurator UI — vertical accent bars, card-style buttons
- [x] Smart Variant Subtitles (`src/lib/option-content.ts`)
- [x] Improved gallery switching — matches variant image URLs
- [x] Shopify Storefront API — single source of truth
- [x] Native colour swatches from Shopify option metafields
- [x] `descriptionHtml` rich text rendering
- [x] 3-step configurator (Shade → Base → Cable) with step dots + back navigation
- [x] Selection summary chips + "Made to order · Uniquely yours" tagline
- [x] Mobile fixes — grid blowout, nav clipping, body scroll lock
- [x] Typography fixes globally
- [x] WaveMark on homepage hero
- [x] Notion integration (contact + project brief forms)
- [x] Transparent PNG logos across breakpoints
- [x] PageTransition wired into layout.tsx
- [x] Per-page metadata and OpenGraph on all routes
- [x] `generateMetadata` on dynamic product and project routes
- [x] `metadataBase` set to https://waves.company
- [x] Real product photography live in Shopify — Ripple (chalk, sand, amber, smoke) + Hourglass