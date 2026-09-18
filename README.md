# TNR Attorneys React preview

React, React Router and Vite. Run `npm install`, then `npm run dev`. Production build: `npm run build`. Configure the host to serve `index.html` for non-file routes. This is a local proposal, not a published replacement.

## Direction

The current direction recreates the user-specified https://lawfirma-wbs.framer.website/ reference: ivory surfaces, brown Libre Caslon Text headings, orange controls, a rounded floating header, large photographs fading into the page, photographic service panels, circular practice navigation, a two-column firm introduction, team portraits, FAQ disclosures and a brown footer. This reference supersedes the previous Living Inspired direction. TNR's logo, actual staff and researched service information are retained. Reference awards, testimonials, outcome promises and free-consultation claims are not asserted for TNR. Phone and email replace the reference's live submission form because no delivery endpoint was supplied.

## Before launch

- Confirm current roster, portrait/logo permission and higher-resolution originals. Current photos are not enlarged beyond their natural width.
- Confirm the Mpumalanga office label: the old site calls a Tonga/Nkomazi address Nelspruit. The preview asks visitors to confirm rather than publishing that label.
- Confirm consultation and fee wording, enquiry recipient, approved privacy notice and any online delivery endpoint. No information is collected by this preview. Email and phone links work; there is no fake form submission.
- All eight current practice pages were retrieved and reviewed for the revision. Expanded service copy includes actual published scope, enquiry types and the firm's assistance, rewritten in plain language. Have the client review it before launch. Specific outcome claims, settlement amounts, legal deadlines, eligibility rules and fee promises remain intentionally omitted.
- Inventory legacy staff profiles, insights, case studies and other indexed URLs, then agree retention/redirects before replacing the old website.
- Confirm production domain before adding final canonical URLs and enabling indexing. `robots.txt` deliberately prevents preview indexing. Sitemap contains proposed final URLs only.
- The user supplied Living Inspired Interiors as a reference on this revision. Its hero, manifesto, capability list, studio page, navigation and visual tokens were inspected without modifying that sibling repository.

## Verification

`npx playwright test` checks all 13 routes at 1440, 1024, 768 and 390 pixels, image loading, horizontal overflow, keyboard menu behaviour, contact links and 200% text enlargement. Screenshots are saved under `test-results` for visual inspection.

## Asset manifest

`public/assets/logo.png`: https://www.tnrattorneys.co.za/wp-content/uploads/2025/09/TRN-Attorneys-Official-Logo.png, original colours, contained in header, 500×400. Permission pending client confirmation.

Portrait files (599×551): `Toohey-Rambau`, `Apfeswaho-Gideon-Vele`, `Vuyisa-Ntloko`, `Promise-Mgabi`, `Michael-Malebati`, `Ndamulelo-Moshapo`, all from `https://www.tnrattorneys.co.za/wp-content/uploads/2019/02/{name}.png`. `Leroy-Malahlela` from the same site's `/wp-content/uploads/2025/09/`. Original full-ratio portraits, no face overlays. Permission and roster confirmation pending.

Current fonts: Libre Caslon Text (regular) and Inter (regular), self-hosted WOFF2 files matching the reference. Open Font License copies are included in `public/assets`. The prior Source font files are retained but are no longer the displayed typography.

### Team hero

The user supplied the seven-person team photograph in chat. Its binary was not exposed locally, so the matching photograph from TNR's published site is used as `tnr-team-hero.png`: https://www.tnrattorneys.co.za/wp-content/uploads/2025/09/TRN-Attorneys-Header2.png (1800×984). This source has a darker treatment than the supplied preview; CSS brightness lifts its display. The full image ratio is retained on mobile to keep every team member visible. Replace with the user's brighter original when its file is available.

### Lawfirma reference assets

Photographs downloaded from the reference's public assets for this local styling recreation. These are illustrative scenes, not photographs of TNR staff or offices. Confirm reuse licensing before publication. All are under `public/assets/lawfirma/`:

- `handshake.jpg`: https://framerusercontent.com/images/oNHIHMYZOkEPHm9ZusBnn9BMA.jpg (previous hero, now unused).
- `business.jpg`: https://framerusercontent.com/images/rCEYmeP63BhNB7QSqiQD6Js5bs.jpg (commercial service panel).
- `litigation.jpg`: https://framerusercontent.com/images/JTx1dzM6qsBPUsZDR82pqkM4.jpg (dispute service panel).
- `rights.jpg`: https://framerusercontent.com/images/qFlUGBcHt1Gwfat5kkzlYCdIVuc.jpg (personal matters panel).
- `advice.jpg`: https://framerusercontent.com/images/7N3o0T189vTHM1Lv0NWxBgR5m3A.jpg (firm introduction).
- `confidence.jpg`: https://framerusercontent.com/images/1kBasCXW9PeoXHaMDDZU1zCjIyE.jpg (wide feature).
- `contact.jpg`: https://framerusercontent.com/images/EtcI32nfSa8LkYUSc2pTmz2VHoU.jpg (contact panel).

`src/Lawfirma.jsx` and `src/lawfirma.css` contain the current homepage, header, footer and visual treatment. `src/content.js` retains the expanded practice content. The original redesign stylesheet is inactive.

Additional source assets inspected but not used in the rendered site: `team.png` from `/wp-content/uploads/2025/09/TRN-Attorneys_Team.png` (1366×768, unsuitable dark composite); `footer-logo.png` from `/wp-content/uploads/2025/09/footer-logo-1.png` (150×100, insufficient size for a prominent footer). Original individual portraits are used instead.

Verified public contact source: https://www.tnrattorneys.co.za/contact/. Practice directory source: https://www.tnrattorneys.co.za/our-areas-of-expertise/. Contract source: https://www.tnrattorneys.co.za/contract-drafting-and-legal-review/.
