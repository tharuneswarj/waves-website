# Planned Features & Enhancements

This document tracks discussed future improvements, features, and integrations for the Waves headless Shopify build.

## 1. Headless Customer Accounts & Login
**Goal:** Keep customers completely immersed in the Waves brand ecosystem instead of bouncing them to `checkout.shopify.com` just to see their orders.
- **Implementation:** Utilize the Shopify Storefront API's `customerCreate` and `customerAccessTokenCreate` mutations.
- **Features:** 
  - Custom Waves-branded login / sign-up modal.
  - Private `/account` dashboard to view past orders, order statuses, and tracking links.
  - Address book management natively on our domain.
  - **Checkout Handoff:** Pass the customer token to the Cart API so when they *do* click checkout, Shopify instantly recognizes them and pre-fills all their shipping/payment data.

## 2. Dynamic Variant Image Switching
**Goal:** The product image gallery should physically change and focus on the correct photo when a customer selects a specific variant (e.g., clicking the "Sand" shade shows the Sand lamp).
- **Implementation:** 
  - Ensure images in Shopify have their respective variants attached to them in the Shopify Admin media section.
  - Update the GraphQL query to map `variant.image` data.
  - Update the `ProductGallery` React component to listen for changes in the URL search params (e.g., `?variant=...`) and automatically scroll to / prioritize that specific image.

## 3. Advanced Variant Metafields (UI Formatting)
**Goal:** Create a data-driven way to format specific option buttons without hardcoding values in the React frontend.
- **Implementation:** 
  - Create a new Variant Metafield in Shopify (e.g., `custom.subtitle`).
  - Link it to variants where extra context is needed (e.g., adding "Digital craft - PLA polymer" to the Printed Base option, or "Natural braided linen" to the Linen cable).
  - Update the `OptionValues` GraphQL query to pull this metafield and politely render it as subtext underneath the main button label if it exists.

## 4. Asset Integration & Population
**Goal:** Fully replace all grey `<PlaceholderImage />` components with the final, high-quality production assets.
- **Implementation:** 
  - Execute the photography brief outlined in `todo-assets.md`.
  - Drop the correctly named assets into their respective `/public` subfolders.
  - Swap out the `<PlaceholderImage />` React components across the codebase with standard Next.js `<Image />` tags pointing to the new local assets.
