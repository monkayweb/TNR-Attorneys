# TNR Attorneys

React, React Router and Vite. Install with `npm install`, preview with `npm run dev`, and build with `npm run build`. Production hosting must serve `index.html` for application routes.

## Design

The homepage establishes the shared black, gold and white palette, Libre Caslon Display headings, DM Sans body text, 4px card and button corners, gold action buttons, header and footer. Inner page styles are in `src/inner-pages.css`; shared homepage styles are in `src/dark.css`.

## Content and routes

The original site was audited on 18 September 2026. The React site contains 44 routes: the homepage, 16 firm pages and legacy content URLs, seven staff profiles, six case studies, four full articles, two insight listings, and eight category/tag/author archives.

`src/original-pages.json` preserves the original firm copy and source URLs. `src/OriginalPages.jsx` renders full service, biography, case and article content alongside shared listing and contact templates. Repeated site navigation, comments and WordPress layout markup are replaced by the shared React components. The old theme's unrelated sample, shop, gallery-layout and demo pages are excluded. See `docs/content-audit.md` for the route inventory.

Original portrait, case and article assets are hosted locally. Image records retain their source URL. `scripts/import-original.mjs` retrieves the source sitemap content as JSON on stdout; `scripts/download-original-assets.mjs` retrieves original image files and prints their local mapping. These are inspection/import helpers rather than automatic application builds.

## Forms and preview

The consultation form validates the enquiry and prepares an email draft for the visitor to review and send. An online delivery endpoint is not connected. Telephone, email and published social links work. All three office addresses are retained from the original contact page.

Preview indexing remains disabled in `public/robots.txt`. The sitemap lists the proposed production URLs. This work does not publish or replace the original website.

## Verification

`npx playwright test` checks all routes at desktop, tablet and mobile widths, image loading, horizontal overflow, keyboard navigation, hero layout and form behavior. A content check compares full imported paragraph and list text against the rendered practice, biography, case and article pages.
