# Cinematic presentation layer

The approved Ro&Lee design is served by explicit `beforeFiles` rewrites from
`src/data/renewal-routes.json` to static documents under `public/renewal/pages`.
This keeps the approved HTML/CSS/scroll animation intact while retaining the
existing Next.js backend. Existing case detail/archive, blog, consultation,
lawyer profiles, policies, directions, locale, admin and API routes remain
owned by Next.js. Old center subroutes absent from the map still resolve normally.

Presentation text and images are versioned in Git; edits to the old Next.js
page component for a mapped path do not change the presentation document.
Case cards in these documents link to the existing live case detail pages.
They are editorial selections, not a replacement for the case management UI.

`npm run build` bundles the existing Analytics and TrafficTracker components
for these documents. It uses only NEXT_PUBLIC Supabase and GA settings. No
service-role key is included in that bundle. Existing Vercel environment
variables and backend endpoints remain unchanged.

Each presentation document includes its public canonical URL, distinct page
metadata, Open Graph tags, site verification and LegalService/WebPage JSON-LD.
Direct static-document URLs redirect to their canonical public paths. The
sitemap merges these paths with the original static and database-backed URLs.

Rollback: revert this deployment commit, or set ROHANDLEE_RENEWAL_DISABLED=1
in Vercel and redeploy to disable the presentation rewrites. The prior source
is retained in backup/pre-cinematic-renewal-20261014.

AEO structured data: `npm run seo:aeo` (also run during `npm run build`) adds
FAQPage, BreadcrumbList and Service JSON-LD generated from the visible FAQ,
breadcrumb and heading of each presentation document, enriches the
LegalService founders, and appends the extra FAQ items listed in
`scripts/aeo/faq-additions.json` to the existing `.rich-faq` accordion using
the same markup. It never changes CSS or existing copy, and is idempotent.
