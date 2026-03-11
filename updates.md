# Waves Website Status & Updates

**Date:** March 12, 2026

## 1. Shopify Integration & Data Handling
- **Removed Hardcoded Fallbacks:** The website is now a strict read-only mirror of Shopify. Hardcoded dimensions, weights, print times, array lists, and hex colors were entirely scrubbed from the codebase.
- **Native Color Swatches:** Upgraded the 2025-01 Storefront API GraphQL query to fetch Shopify's native Category Metafield swatches. Color buttons on the product page now automatically pull their hex codes directly from Shopify's Variant Option Values.
- **Rich Text Support:** Product descriptions now utilize `descriptionHtml` to render beautifully formatted text (bold, italic, spacing) authored directly in the Shopify Admin.
- **Cleaned Up Dependencies:** Removed deprecated programmatic metafield seeder scripts and Admin API tokens from `.env.local`. Website simply reads data safely over the public Storefront API.

## 2. Product Page Formatting
- **Form UI/UX:** Added the premium "Made to order · Uniquely yours" taglines directly into the configurator flow.
- **Dynamic Selectors:** Cable and Base text outputs dynamically mirror the exact variant selection strings from Shopify without hardcoded subtext replacements.
- **Responsive Grid Fix:** Resolved the CSS Grid horizontal layout blowout bug on mobile, allowing the form and image gallery to stack and scale fluidly on small screens.

## 3. Global UI & Typography
- **Contrast Improvements:** Boosted the opacity of all hint texts, legends, eyebrow tags, and meta-labels globally to ensure they pass legibility contrast standards on our cream backgrounds.
- **Headline Rendering:** Remapped the `h1-h6` baseline typography rules into standard `@layer base` CSS scopes, resolving bugs where Tailwind utility classes (like `text-surface`) couldn't override standard colors.
- **Homepage Impact:** Boosted the size and stroke width of the homepage animated `WaveMark` logo for a more confident hero presence.

## 4. Housekeeping
- Removed unused and experimental codebase components (e.g. `PointCloudHero`).
- Polished the mobile navigation menu, fixing the clipping bug where links were trapped inside the `backdrop-blur` containing block, and added body-scroll locking while the menu is open.

---

> **Note on Future Enhancements:**
> For variant selectors like *Base* or *Cable*, we identified a strategy for future custom formatting: adding a `custom.subtitle` variant metafield in Shopify. This would allow the code to blindly pull and render smart sub-labels (e.g., "Digital craft - PLA polymer") underneath option buttons without actually hardcoding the logic in React.