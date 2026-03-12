# Waves Website – Current State (Updates)

*Generated: 13 March 2026*
*Branch: antigravity*
*Status: PENDING MERGE*

## 1. Overview
The Waves frontend is currently configured as a Next.js (App Directory) headless storefront that integrates securely with the Shopify Storefront API.

## 2. Global UI & Configurator
- Global `Header` integrates navigation, an active Cart tracker, and Account links.
- **Configurator UI:** 
  - Redesigned with vertical accent bars and card-style base/cable selection.
  - Features smart variant subtitles parsed from custom Shopify metafields.
- **Gallery Switching:** 
  - Dynamic shade selection pulls exact variant image URLs natively from Shopify.
  - Progressive fallback filtering relies on `[shade|base|cable]` alt-text tags.

## 3. Shopify Storefront API Integration
- All queries flow strictly through the `storefrontToken` using a custom `shopifyFetch` wrapper (`src/lib/shopify.ts`).
- **Product Options:** Dynamically renders color swatches based on Category Metafield Hex inputs directly configured in the Shopify admin.
- Administrative Admin API scripts were safely removed.

## 4. Headless Customer Accounts (Phases 1 & 2)
- **Phase 1 (Auth Layer):**
  - Fully integrated a Waves-branded Login / Sign-up floating portal (`AuthModal`).
  - Implemented secure token negotiation and persistent state caching via `useAuthStore` (Zustand).
- **Phase 2 (Account Portal):**
  - Live `/account` dashboard established with client-side, protected-route navigation.
  - Fully functional multi-tab layout serving **Orders**, **Addresses**, and **Account Details**.
  - **Orders Tab:** Fetches past order fulfillment statuses and total prices. Individual order pages render line-time specifics, variant images, and direct tracking links.
  - **Addresses Tab:** Inline CRUD forms available for directly mutating the Shopify Customer address book.
  - **Account Details:** Dynamic capability to update personal names/emails and securely reset passwords.

## 5. Additional Connections
- **Notion Integration:** Connected the API hooks for forwarding both contact queries and project brief forms directly to a Notion workspace.
- **Brand Assets:** Refactored transparent PNG logos across navigation breakpoints.
- Cleaned unused WebGL/Three.js legacy code dependencies (`drei`, `fiber`, etc) since 3D configuration was deprecated.