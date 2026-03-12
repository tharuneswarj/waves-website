# Planned Features & Enhancements

This document tracks discussed future improvements, features, and integrations for the Waves headless Shopify build. It acts as an ongoing to-do list for upcoming development sessions.

## 1. Page Transition Animations
**Goal:** Make navigation between routes feel seamless and premium rather than abrupt traditional hard-loads.
- **Implementation:** Utilize Framer Motion.
- **Action Items:** Wrap the main page content inside the existing `PageTransition` component (`src/components/PageTransition.tsx`). Ensure the default pattern (`opacity: 0 → 1`, `y: 10 → 0`, `duration: 0.3s ease-out`) fires cleanly across the `app/layout.tsx`.

## 2. Order History Pagination & Search
**Goal:** Enhance the `/account` Orders tab once customers accumulate large order pools.
- **Implementation:** Extend the Storefront API `getCustomerOrders` GraphQL edge query to accept standard cursor-based pagination arguments.
- **Action Items:** Add an "Overview" search bar locally filtering cached arrays, and a "Load More" button to fetch older fulfillment nodes.

## 3. Persistent Cart Syncing (Authenticated)
**Goal:** Automatically sync a user's local guest cart to their Shopify customer profile if they log in midway through shopping.
- **Implementation:** Link `useAuthStore` logically with `useCartStore`.
- **Action Items:** Upon the `customerAccessTokenCreate` mutation resolving successfully, query Shopify to see if an existing active profile cart exists. If so, merge the local line items using the `cartLinesAdd` mutation.

## 4. Automated Transactional Emails (Resend + Shopify Webhooks)
**Goal:** Trigger branded Waves emails for customized lifecycle events (e.g. "Your lamp is currently being printed", "It is curing").
- **Implementation:** Utilize Shopify Webhooks connected to a dedicated Next.js API route (`app/api/webhooks/shopify`).
- **Action Items:** Parse incoming order updates and trigger stylized React Email templates through the Resend API.

## 5. Rich Content / "Process" Page Media
**Goal:** Finish populating the frontend with high-fidelity studio assets.
- **Implementation:** Read through `todo-assets.md` to identify missing placeholder coverage.
- **Action Items:** Batch-optimize all final PNGs/WebPs locally, and bind them to standard Next.js `<Image />` tags across the `/process` and `/studio` static routes.

## 6. SEO & Metadata Implementation
**Goal:** Support organic discovery and satisfy the `site-structure.md` SEO guidelines.
- **Implementation:** Utilize Next.js 14/15 Metadata API.
- **Action Items:** 
  - Define a dynamic `metadata` export for every page yielding a unique title tag, description, and OG image. 
  - Generate Schema.org structured JSON-LD data for individual product pages.
  - Setup a dynamic `sitemap.xml` and `robots.txt` generated globally.

## 7. Dynamic CMS Integrations (Sanity / Metaobjects)
**Goal:** Fill out the remaining editorial routes outlined in `site-structure.md` without hard-coding text.
- **Implementation:** Setup Sanity.io or heavily leverage Shopify Metaobjects.
- **Action Items:** Map the `/studio`, `/studio/[slug]`, `/about`, and `/process` pages to pull content directly from the selected CMS to ensure non-developer maintainability.

## 8. Integrated Cart Drawer & Checkout Handoff
**Goal:** Improve purchasing flows with standard e-commerce interactions.
- **Implementation:** Build a Context or Zustand cart store leveraging the `cartCreate` and `cartLinesAdd` Shopify Storefront endpoints.
- **Action Items:** Add a native slide-out drawer cart accessible across all routes, alongside a seamless link redirect to Shopify's managed checkout. 

## 9. Contact Forms & Notion Sync
**Goal:** Safely capture general requests vs. B2B project briefs as designed in `/contact`.
- **Implementation:** Next.js Route Handlers (`app/api/...`) securely triggering Notion API endpoints or Formspree instances.
- **Action Items:** Finalize the two interactive form components and establish error handling/success states.
