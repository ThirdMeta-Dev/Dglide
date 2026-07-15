# Master Prompt: Supabase Egress Optimization and Technical SEO

You are working inside an existing production project built with Next.js App Router, React, TypeScript, Supabase Postgres/Auth/Storage, and `next/image`.

Implement a production-grade Supabase egress optimization and technical SEO standard based on the requirements below. The goal is to keep Supabase network egress flat or reduce it as traffic grows, without breaking images, CMS freshness, publishing workflows, indexing, social previews, or page rendering.

This is an implementation and verification task, not an advisory report. First audit the existing project and measure the current baseline. Then make the required changes, validate them in a production build, and provide evidence of the before/after behavior.

Preserve the destination project's existing fonts, colors, UI, brand name, domain, routes, copy, analytics, and design system. Replace all example values with the destination project's real configuration. Do not copy DGlide-specific domains, project IDs, bucket names, brand text, authors, logos, or analytics IDs.

## Objectives

1. Reduce direct Supabase Storage downloads and repeated PostgREST requests.
2. Prevent raw Supabase image URLs from being emitted into rendered blog HTML, RSC payloads, Open Graph metadata, Twitter metadata, or JSON-LD when they can be served through the application's cached image layer.
3. Give immutable uploaded media a one-year browser/CDN cache lifetime.
4. Prevent storage metadata/listing polling and orphaned migration/audit scripts from generating unnecessary requests.
5. Fetch the smallest possible database payload and cache it at the server/framework layer.
6. Preserve fast CMS updates through explicit path/tag revalidation.
7. Implement canonical URLs, robots rules, XML sitemap, page metadata, social metadata, and structured data for all published blog content.
8. Exclude drafts, trash, admin routes, and private APIs from public indexing.
9. Add monitoring so future changes cannot silently increase egress.

## 1. Audit before changing code

Inspect the repository, deployment configuration, Supabase project, and production output. Produce a concise baseline covering:

- Every Supabase project URL referenced in source, environment variables, built output, scripts, documentation, and generated files.
- Whether local, preview, and production environments point to the intended project. Flag old-project URLs and mixed-project configuration.
- Every direct Supabase Storage URL in JSX, CSS, database HTML, metadata, JSON-LD, sitemap output, RSC payloads, and generated HTML.
- All uses of `images.unoptimized`, plain `<img>`, `next/image`, manual `/_next/image` URLs, and remote image configuration.
- All Storage calls, especially `/object/list`, `/object/info`, signed URL creation, existence checks, and repeated bucket scans.
- All PostgREST queries, selected columns, cache configuration, pagination, request frequency, and whether large JSON/HTML fields are fetched on list pages.
- Storage response headers for representative media: `Cache-Control`, `Age`, `ETag`, `Content-Length`, and CDN cache status.
- Bucket object inventory versus database/post references. Report orphaned objects but do not delete them without explicit authorization.
- Running local/background migration, audit, `curl`, Node, cron, CI, or monitoring processes that repeatedly call Storage. Stop only processes that are clearly part of this project's audit/migration and are safe to stop; report what was stopped.
- Supabase Storage/API logs grouped by route and status so metadata requests are distinguished from actual object downloads and byte egress.
- Current page HTML/RSC size and whether the blog listing serializes complete post bodies instead of list summaries.

Do not assume that a high request count equals high byte egress. Separate:

- Object downloads (`/storage/v1/object/public/...`)
- Image optimizer origin fetches
- Storage metadata/info requests
- Storage list requests
- Database/PostgREST response bytes
- Auth/realtime traffic

Record a time-stamped baseline before implementing changes.

## 2. Next.js image optimization

- Ensure `images.unoptimized` is absent or `false`.
- Configure `next.config.ts`/`next.config.js` with explicit `remotePatterns` for only the active Supabase Storage hostname and required public bucket paths. Do not use broad wildcards covering arbitrary hosts.
- Set `images.minimumCacheTTL` to `31536000` seconds for immutable CMS media.
- Use `next/image` for featured images, card thumbnails, author avatars, and other CMS images.
- Always provide correct `alt`, dimensions or `fill`, responsive `sizes`, and `priority` only for true above-the-fold/LCP images.
- Use stable, UUID/content-hashed filenames so a one-year cache never serves stale replacements. Updating an image must create a new object URL rather than overwriting the existing object.
- Keep image quality and requested widths reasonable. Avoid generating many near-identical variants from arbitrary dynamic widths.
- Preserve optimized URLs for remotely hosted Supabase images in server-rendered article content. When rich HTML contains a known active bucket URL, rewrite its `src` to the application's `/_next/image?url=...&w=<appropriate width>&q=<quality>` endpoint or render it through a safe image component/parser.
- Build absolute application-hosted optimized image URLs for Open Graph, Twitter, and JSON-LD, because crawlers require absolute URLs.
- Do not rewrite unrelated remote images unless their host is explicitly approved.
- Do not expose old Supabase project URLs after migration. The active project/bucket origin must come from validated configuration, not a duplicated hard-coded literal scattered across files.

## 3. Storage upload and caching standard

Apply the same policy to every upload path, including:

- Admin media uploads
- Featured/body image uploads
- Upload-from-URL
- Google Docs imports
- DOCX embedded-image imports
- Clipboard/pasted images
- Migration/import scripts

For every new immutable media object:

- Generate a unique path such as `uploads/<uuid>-<sanitized-filename>`.
- Upload with the correct `contentType`.
- Set Supabase Storage `cacheControl: '31536000'`.
- Do not overwrite objects (`upsert: false`) unless there is a documented exceptional reason.
- Store the resulting public URL and storage path once in the media database record.
- Validate supported MIME types and cap image size (10 MB unless the destination project defines a stricter limit).
- For server-side remote import, enforce allowed hostnames, HTTPS, fetch timeout, redirect limits, MIME validation, byte-size limit, and SSRF protections.
- Remove temporary `blob:`, base64, Google CDN, or expiring signed URLs from stored blog HTML after successful import.

Existing objects with missing or `no-cache` headers cannot necessarily be repaired in place through metadata alone. Create a safe migration plan that copies/reuploads them under new immutable paths with the correct cache policy, updates database references transactionally or in resumable batches, validates all references, and only then proposes removal of old objects. Do not mass-delete media automatically.

## 4. Eliminate unnecessary Storage metadata traffic

- The public site must never call Storage `list`, `info`, or existence-check APIs during page rendering.
- Store URL, dimensions, alt text, MIME type, size, and storage path in the media table at upload time.
- Render from stored database references rather than discovering objects from the bucket on every request.
- The admin media library may query its media table with pagination; it must not repeatedly crawl the entire bucket.
- Avoid checking whether every image exists before rendering. Use image error fallbacks and repair tools instead.
- Ensure polling hooks, effects, dashboards, monitoring scripts, and development tools do not continuously call `/object/list` or `/object/info`.
- Add cancellation/cleanup for client effects and guard React development double-invocation from creating uncontrolled network loops.
- Audit cron jobs, shell loops, migration scripts, and CI processes for repeated `curl` or Storage calls. Convert audits to bounded, rate-limited, resumable jobs with an explicit maximum request count.
- Never treat metadata request volume as image byte egress without examining route and response size.

## 5. Database and PostgREST egress

Create separate explicit field selections for each use case:

- Blog list/card query: ID, title, slug, excerpt, status/post type if required, author display name, featured image URL/alt, publication date, featured flag, tags/categories only when filtering needs them, created date, and updated date.
- Public blog detail query: all public article fields needed for one post, including body HTML and SEO fields, but never revisions, private user metadata, admin settings, or unrelated columns.
- Admin list query: list fields only; fetch the full post only when opening the editor.
- Sitemap query: slug, published/updated timestamps, and status only.

Requirements:

- Never use `select('*')` for public list, sitemap, or admin table views.
- Never load every article body into `/blogs` HTML or its RSC payload.
- Paginate large results and cap API page size.
- Fetch only published posts publicly.
- Add database indexes for slug, status, published date, featured flag, post type, and common sort/filter combinations.
- Sanitize PostgREST search input and allowlist sort columns.
- Avoid N+1 author/media queries; use a bounded join or snapshot fields where appropriate.
- Use `Promise.all` only for a small known number of independent queries, not per-row network fan-out.
- Keep the Supabase service-role client server-only and lazily initialized.

## 6. Server caching and revalidation

- Add a custom server-side fetch function for the Supabase server client that preserves the caller's Next.js fetch options and applies `next: { revalidate: 300 }` by default.
- Do not accidentally overwrite an explicit shorter/longer revalidation choice or cache tags supplied by a caller.
- Cache public blog listing/detail data for approximately five minutes unless the destination project's traffic/update needs justify another documented value.
- The blog listing page and detail route should export or use equivalent `revalidate = 300` behavior.
- Cache the sitemap for 24 hours (`revalidate = 86400`) while also invalidating it after publishing changes.
- Avoid `cache: 'no-store'` for stable public CMS content.
- Admin writes must explicitly revalidate affected pages so editors do not wait for TTL expiry.

After post create/update/publish/unpublish/trash/restore/delete or slug change, revalidate:

- `/`
- `/blogs`
- `/sitemap.xml`
- The previous `/blogs/<old-slug>` when applicable
- The current `/blogs/<new-slug>` when applicable
- The dynamic `/blogs/[slug]` page pattern or the equivalent cache tag

After global blog settings changes, revalidate all affected blog-detail pages or their shared cache tag.

Provide a protected admin-only manual cache-revalidation endpoint/action. It must not be public or callable without authorization.

## 7. Prevent raw Supabase URLs in output

After a production build, scan generated HTML, RSC output, route payloads, metadata output, and sitemap for the active/old Supabase hostnames.

The target is:

- Zero raw Supabase Storage URLs in rendered `<img src>` values when those images should use Next.js optimization.
- Zero raw Supabase URLs in Open Graph/Twitter images.
- Zero raw Supabase URLs in JSON-LD image fields.
- No old-project hostname anywhere in generated public output.

A raw origin URL may still appear URL-encoded inside the application-owned `/_next/image` query string; that is expected because the optimizer needs an origin. Confirm the browser requests the application optimizer first and that repeated requests are served from the application/CDN cache rather than repeatedly reaching Supabase.

Do not claim zero origin traffic: the first cache miss for each optimized variant must fetch the source. The goal is to make subsequent traffic hit the application/CDN cache and to minimize unnecessary variants.

## 8. Root metadata standard

Use Next.js Metadata APIs with a single validated canonical site origin from `NEXT_PUBLIC_SITE_URL` or an equivalent environment variable.

At the root layout configure:

- `metadataBase`
- Default title and a title template
- Site-wide default description
- Open Graph type `website`, site name, and locale
- Twitter/X `summary_large_image` defaults and configured account if one exists
- Robots defaults: `index: true`, `follow: true`
- Googlebot directives including `max-image-preview: large` and unrestricted useful snippet preview
- Correct `<html lang>`

Do not silently fall back to the wrong production domain. Validate the URL and document environment requirements.

## 9. Canonical host and legacy redirects

- Choose one canonical production host, such as `https://www.example.com` or the project's approved apex domain.
- Permanently redirect every alternate host to the canonical host while preserving path and query string.
- Add permanent redirects for legacy blog routes such as `/blog`, `/posts`, and `/blog/:slug` to the current `/blogs` structure when those routes previously existed.
- Redirect known alternate sitemap routes (`/sitemap`, `/sitemap_index.xml`, or historical typos only if they receive traffic) to `/sitemap.xml`.
- Avoid redirect chains and loops. Test HTTP status, `Location`, query preservation, and canonical output on both hosts.
- Keep a single trailing-slash policy consistent with the framework configuration.

## 10. Robots.txt

Implement `app/robots.ts` (or the framework equivalent) using the canonical site origin.

Required behavior:

- Allow public crawling by default.
- Disallow `/admin/` and `/api/`.
- Reference the absolute canonical `/sitemap.xml` URL.
- Do not block public JS/CSS/images required for rendering.
- Do not use robots.txt as an access-control mechanism; admin/API protection must exist independently.
- Ensure preview/staging deployments use `noindex` at the platform or metadata layer so they do not compete with production.

## 11. XML sitemap

Implement a dynamic sitemap through `app/sitemap.ts` or the framework equivalent.

- Include every canonical, indexable static page with an appropriate priority and realistic change frequency.
- Include `/blogs`.
- Query only published blog posts.
- Add one canonical URL per published slug.
- Set `lastModified` from `updatedAt`, falling back to `publishedAt`/created time.
- Use sensible blog-detail values such as monthly change frequency and moderate priority; do not pretend every page changes daily.
- Exclude drafts, trash, admin, API, authentication pages, filtered/search states, and duplicate legacy URLs.
- Use a minimal sitemap query; never fetch body HTML, media metadata, revisions, or author bios.
- Cache for approximately one day and revalidate immediately after publishing changes.
- If content can exceed sitemap protocol limits, split into sitemap indexes before reaching 50,000 URLs or 50 MB uncompressed.
- Make the sitemap resilient: a temporary CMS failure should return the known static entries rather than crash the entire route, while still logging the error server-side.

## 12. Blog listing SEO

For `/blogs`:

- Fetch published posts only, newest first, using list-only fields.
- Define a unique title and useful meta description.
- Set canonical to the absolute `/blogs` URL.
- Add Open Graph title, description, URL, and type `website`.
- Add Twitter/X `summary_large_image` metadata.
- Use one visible H1 and a logical heading hierarchy.
- Ensure important article links are real server-rendered `<a>`/Next `<Link>` elements, not JavaScript-only navigation.
- Do not index internal search/filter combinations as separate duplicate pages unless proper server routes, canonicals, and unique value exist.
- Keep useful listing content in initial server output, but do not serialize full post bodies.

## 13. Blog-detail SEO

For `/blogs/[slug]`:

- Return a real 404 for a missing, draft, or trashed post.
- Generate static parameters for known published posts and allow newly published dynamic slugs.
- Generate metadata per post using:
  - `seoTitle` with `title` fallback
  - `seoDescription` with `excerpt` fallback
  - Absolute canonical URL
  - Open Graph `article` type
  - Absolute application-optimized 1200×630 featured image
  - Publication time, modification time, author, and tags
  - Twitter/X `summary_large_image`
- Never use a raw Supabase Storage URL directly as the Open Graph, Twitter, or schema image when an application-hosted optimized image URL can be used.
- Render a visible breadcrumb and match it with Breadcrumb structured data.
- Use exactly one descriptive H1. Build article subsections with H2/H3 hierarchy.
- Generate stable, unique IDs for H2 headings for the table of contents and deep linking.
- Sanitize stored rich HTML before rendering: remove scripts, styles where inappropriate, iframes/objects/embeds/forms/base/meta/link tags, event-handler attributes, and `javascript:` URLs. Prefer a proven HTML sanitizer with an explicit allowlist over regex-only sanitization.
- Ensure every meaningful image has alt text, reserved dimensions, and responsive loading behavior.
- Use real author data and accurate dates; do not emit fabricated engagement statistics.

## 14. Structured data

Emit JSON-LD using `JSON.stringify` in non-visible `<script type="application/ld+json">` elements.

### Article/BlogPosting

Include:

- `@context: https://schema.org`
- `@type: BlogPosting` or `Article`
- Headline
- Description
- Canonical URL/main entity
- Absolute optimized featured image
- `datePublished`
- `dateModified`
- Author Person/Organization with real name and URL when available
- Publisher Organization with canonical URL and absolute logo
- Keywords/tags when present

### BreadcrumbList

Represent Home → Blogs → Current Article using canonical absolute URLs and correct positions.

### FAQPage

- Emit FAQ schema only when the visible article genuinely contains an FAQ section.
- Extract question/answer pairs from supported heading-based or bold-question formats.
- The schema text must match visible page content.
- Do not emit empty FAQ schema or invent questions with AI at render time.
- Render FAQs accessibly, for example with `<details>/<summary>`, while preserving the underlying saved article content.

Validate structured data output and ensure undefined values do not create invalid properties.

## 15. Open Graph and image egress rules

- Social metadata images must be absolute and crawlable.
- Prefer a stable application/CDN URL representing a 1200×630 image.
- If using `/_next/image`, confirm production permits crawler access and the URL is stable. If the deployment/CDN does not reliably support optimizer URLs for social bots, create a dedicated cached application image proxy or generated OG route that fetches Supabase once and serves from the application CDN.
- Include image width, height, and alt where supported.
- Test social metadata without causing repeated uncached Supabase origin downloads.

## 16. Performance and output-size controls

- Keep public list queries and RSC payloads small.
- Do not embed the entire blog database or article bodies into the blog listing page.
- Lazy-load below-the-fold images and interactive sections.
- Use `priority` sparingly for LCP images only.
- Avoid duplicate desktop/mobile image components that both download the same source.
- Avoid broad client hydration when server components can render stable content.
- Track generated HTML/RSC size and number of unique optimized image variants.
- Do not solve egress by making all content stale indefinitely; use explicit revalidation to balance freshness and caching.

## 17. Egress monitoring and regression guard

Create a reusable, read-only monitoring procedure/script and document how to run it.

It should report for a fixed time window:

- Storage object-download request count and response bytes
- Storage list/info request counts separately
- PostgREST request count and response bytes where available
- Top routes, object paths, user agents/referrers, status codes, and cache-control values
- Direct origin image URLs found in production HTML
- Application image-optimizer requests and cache-hit behavior
- Current bucket object count/size and orphan candidates without deleting them

Safety requirements:

- The monitor itself must not increase egress materially.
- Never crawl every object repeatedly.
- Use bounded samples, log aggregation, and database/media-table references.
- Add a clear maximum run duration and request budget.
- Prevent overlapping runs with a lock/PID mechanism.
- Print the target Supabase project reference before any audit so the wrong project is not queried.
- Never print service keys, PATs, access tokens, or full signed URLs.

Define a baseline and alert thresholds. At minimum fail or warn when:

- Raw Supabase image URLs reappear in rendered public image/metadata/schema output.
- An upload route omits one-year cache control.
- A public list query selects `content_html`, revisions, or `*`.
- Storage list/info traffic rises unexpectedly.
- Direct object-download bytes exceed the agreed baseline by a meaningful margin after normalizing for traffic.
- The build contains an old Supabase project hostname.

## 18. Security and secret hygiene

- Keep Supabase service-role keys and management tokens server-only and out of source control.
- Scan tracked files and relevant local project files for accidentally exposed Supabase PATs/service keys without printing their values.
- If a secret is found, report its location safely and recommend immediate rotation; do not copy it into logs or output.
- Protect revalidation and admin endpoints with real server authorization.
- Do not expose Storage management APIs publicly.
- Validate rich HTML and remote images at trust boundaries.
- Keep public buckets limited to genuinely public media; use private buckets and signed delivery only where access control is required.

## 19. Verification checklist

Run and report all applicable checks:

1. Lint, TypeScript/typecheck, tests, and production build pass.
2. `/robots.txt` returns correct allow/disallow rules and canonical sitemap URL.
3. `/sitemap.xml` contains canonical static pages and published posts only.
4. Blog listing canonical, title, description, Open Graph, and Twitter metadata are correct.
5. Every published detail page has correct canonical, article metadata, social image, Article/BlogPosting schema, Breadcrumb schema, and conditional FAQ schema.
6. Draft, trashed, admin, API, legacy, alternate-host, and duplicate URLs are not indexed as canonical content.
7. Alternate host and legacy routes return one-hop permanent redirects.
8. Representative uploaded media returns a one-year cache header.
9. Public image requests go through the application optimizer/CDN and repeated requests do not repeatedly hit Supabase origin.
10. Production HTML/RSC/metadata/schema contains zero unintended raw or old-project Supabase URLs.
11. Blog listing does not include `content_html` or serialize complete posts.
12. Publishing/unpublishing/slug changes immediately revalidate listing, detail, homepage where relevant, and sitemap.
13. No uncontrolled Storage list/info loop or audit process remains running.
14. Compare a fixed post-change monitoring window with the baseline and explain the result in requests and bytes, not request count alone.

## 20. Required final report

Finish with a concise evidence-based report containing:

- Baseline and after measurements
- Root causes found, separated into object bytes, metadata/list calls, and database payload
- Files and configuration changed
- Cache/revalidation strategy implemented
- Upload paths verified with one-year cache control
- Raw-origin URL scan results
- SEO routes and metadata/schema implemented
- Redirect and canonical-host behavior
- Tests/build results
- Remaining risks or migration work, especially old no-cache objects
- Exact monitoring command/procedure for future audits

The task is complete only when the public site remains fresh after CMS edits, repeated page/image traffic is served primarily by the application/CDN cache rather than Supabase origin, database payloads are minimal, no runaway Storage metadata process exists, and all indexable pages expose one consistent canonical/robots/sitemap/metadata/structured-data standard.
