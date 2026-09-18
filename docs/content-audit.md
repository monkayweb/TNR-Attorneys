# Original Site Content Audit

Audited 18 September 2026 using the original site's page, personnel, portfolio, article and taxonomy sitemaps and the published main navigation.

The firm routes below are implemented locally with the homepage's shared design. Full published paragraphs and lists are retained for service pages, biographies, case details and articles. Listing pages use shared React cards and local detail links. Original images are downloaded locally; their provenance is stored in `src/original-pages.json`.

The homepage keeps the design and section order approved in this project. Unrelated WordPress theme demo pages (sample page, pricing demo, alternate homepage/layout demos, shop/cart/checkout, maintenance and coming-soon templates) are excluded. WordPress comments, administrative widgets and repeated original header/footer markup are not migrated. The blank original newsletter page is represented by the firm's current article directory. Consultation submission remains an email draft, matching the existing preview behavior.

## Route Inventory

| Route | Type | Original Source |
| --- | --- | --- |
| `/` | Homepage | https://www.tnrattorneys.co.za/ |
| `/contact/` | page | https://www.tnrattorneys.co.za/contact/ |
| `/casestudies/` | page | https://www.tnrattorneys.co.za/casestudies/ |
| `/about-us/` | page | https://www.tnrattorneys.co.za/about-us/ |
| `/meettheteam/` | page | https://www.tnrattorneys.co.za/meettheteam/ |
| `/ourclients/` | page | https://www.tnrattorneys.co.za/ourclients/ |
| `/our-areas-of-expertise/` | page | https://www.tnrattorneys.co.za/our-areas-of-expertise/ |
| `/commercial-disputes/` | page | https://www.tnrattorneys.co.za/commercial-disputes/ |
| `/contract-drafting-legal-review/` | page | https://www.tnrattorneys.co.za/contract-drafting-legal-review/ |
| `/unlawful-arrest-and-civil-rights/` | page | https://www.tnrattorneys.co.za/unlawful-arrest-and-civil-rights/ |
| `/medical-negligence/` | page | https://www.tnrattorneys.co.za/medical-negligence/ |
| `/road-accident-fund/` | page | https://www.tnrattorneys.co.za/road-accident-fund/ |
| `/newsletter-2/` | page | https://www.tnrattorneys.co.za/newsletter-2/ |
| `/wills-and-estates/` | page | https://www.tnrattorneys.co.za/wills-and-estates/ |
| `/commercial-law/` | page | https://www.tnrattorneys.co.za/commercial-law/ |
| `/contract-drafting-and-legal-review/` | page | https://www.tnrattorneys.co.za/contract-drafting-and-legal-review/ |
| `/labour-and-administrative-law/` | page | https://www.tnrattorneys.co.za/labour-and-administrative-law/ |
| `/attorneys/ndamulelo-moshapo/` | personnel | https://www.tnrattorneys.co.za/attorneys/ndamulelo-moshapo/ |
| `/attorneys/michael-malebati/` | personnel | https://www.tnrattorneys.co.za/attorneys/michael-malebati/ |
| `/attorneys/promise-mgabi/` | personnel | https://www.tnrattorneys.co.za/attorneys/promise-mgabi/ |
| `/attorneys/vuyisa-ntloko/` | personnel | https://www.tnrattorneys.co.za/attorneys/vuyisa-ntloko/ |
| `/attorneys/apfeswaho-gideon-vele/` | personnel | https://www.tnrattorneys.co.za/attorneys/apfeswaho-gideon-vele/ |
| `/attorneys/toohey-rambau/` | personnel | https://www.tnrattorneys.co.za/attorneys/toohey-rambau/ |
| `/attorneys/leroy-malahlela/` | personnel | https://www.tnrattorneys.co.za/attorneys/leroy-malahlela/ |
| `/portfolio/case-study-1/` | portfolio | https://www.tnrattorneys.co.za/portfolio/case-study-1/ |
| `/portfolio/casestudy2/` | portfolio | https://www.tnrattorneys.co.za/portfolio/casestudy2/ |
| `/portfolio/casestudy3/` | portfolio | https://www.tnrattorneys.co.za/portfolio/casestudy3/ |
| `/portfolio/casestudy4/` | portfolio | https://www.tnrattorneys.co.za/portfolio/casestudy4/ |
| `/portfolio/casestudy5/` | portfolio | https://www.tnrattorneys.co.za/portfolio/casestudy5/ |
| `/portfolio/casestudy6/` | portfolio | https://www.tnrattorneys.co.za/portfolio/casestudy6/ |
| `/2025/10/16/lessons-from-dying-intestate-why-a-valid-will-matter/` | post | https://www.tnrattorneys.co.za/2025/10/16/lessons-from-dying-intestate-why-a-valid-will-matter/ |
| `/2025/10/17/the-importance-of-understanding-marital-regimes-before-entering-into-marriage-in-south-africa/` | post | https://www.tnrattorneys.co.za/2025/10/17/the-importance-of-understanding-marital-regimes-before-entering-into-marriage-in-south-africa/ |
| `/2025/10/17/legalinsights/` | post | https://www.tnrattorneys.co.za/2025/10/17/legalinsights/ |
| `/2026/03/03/divorce-in-south-africa-its-not-war-but-its-not-a-group-project-either/` | post | https://www.tnrattorneys.co.za/2026/03/03/divorce-in-south-africa-its-not-war-but-its-not-a-group-project-either/ |
| `/2026/04/07/wills-vs-trusts-whos-really-babysitting-your-legacy/` | post | https://www.tnrattorneys.co.za/2026/04/07/wills-vs-trusts-whos-really-babysitting-your-legacy/ |
| `/2025/10/17/blog/` | post | https://www.tnrattorneys.co.za/2025/10/17/blog/ |
| `/category/wills-estate/` | archive | https://www.tnrattorneys.co.za/category/wills-estate/ |
| `/category/expert-commentary-and-analysis-on-the-latest-legal-developments-in-south-africa/` | archive | https://www.tnrattorneys.co.za/category/expert-commentary-and-analysis-on-the-latest-legal-developments-in-south-africa/ |
| `/tag/law/` | archive | https://www.tnrattorneys.co.za/tag/law/ |
| `/tag/wills-estates/` | archive | https://www.tnrattorneys.co.za/tag/wills-estates/ |
| `/author/admin/` | archive | https://www.tnrattorneys.co.za/author/admin/ |
| `/portfolio_category/casestudy/` | archive | https://www.tnrattorneys.co.za/portfolio_category/casestudy/ |
| `/portfolio_tag/casestudy/` | archive | https://www.tnrattorneys.co.za/portfolio_tag/casestudy/ |
| `/personnel_category/tnr-attorney-team/` | archive | https://www.tnrattorneys.co.za/personnel_category/tnr-attorney-team/ |
