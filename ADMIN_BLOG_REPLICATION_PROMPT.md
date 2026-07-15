# Master Prompt: Replicate the Complete Admin and Blog System

You are working inside an existing production web project. Implement a complete, production-ready admin CMS and public blog system based on the specification below.

## Primary objective

Recreate the same end-to-end admin and blog capabilities described here inside this project, using this project's existing brand identity and UI system.

The destination project already has its own fonts, colors, spacing, components, header, footer, buttons, form controls, breakpoints, and visual language. Preserve and reuse those. Do not copy DGlide branding, logos, color values, font names, marketing copy, or page-specific styling. The functionality, information architecture, workflows, data model, editor behavior, safety measures, and public blog capabilities should be replicated; the visual design must feel native to the destination project.

The destination stack is the same: Next.js App Router, React, TypeScript, Tailwind/CSS modules, Supabase Auth/Postgres/Storage, TipTap, Lucide icons, and the existing AI provider integration. Inspect the repository before coding and follow its conventions. Reuse existing helpers and components where possible. Do not create a parallel design system.

This is an implementation task, not a mockup. Build all pages, API routes, database migrations, storage setup, authentication protection, validation, responsive states, empty/loading/error states, cache revalidation, metadata, and tests needed for a working end-to-end result. Do not leave placeholder buttons, fake data, TODOs, or disconnected UI.

## Scope

Build these connected areas:

1. Secure admin authentication and admin shell
2. Admin dashboard
3. Complete post management screen
4. Full rich-text blog editor
5. AI writing, improvement, import, and SEO tools
6. Media library and media picker
7. User/author management
8. Global blog-detail template settings
9. Standard public blog listing page
10. Standard public blog detail template
11. Supabase schema, storage, server data layer, validation, caching, and security

Do not rebuild unrelated website pages or replace the destination project's existing public header/footer.

## 1. Authentication and authorization

- Use Supabase email/password authentication for `/admin/login`.
- Protect every `/admin/*` route except `/admin/login` at the server/middleware layer.
- Redirect unauthenticated users to login and authenticated users away from the login page.
- Protect every admin API route independently on the server; hiding UI is not authorization.
- Support an explicit production admin allowlist via environment configuration and fail closed when it is missing in production. Never allow every authenticated account merely because the allowlist is empty.
- Keep author/editor profile roles distinct from authentication. Supported roles are `administrator`, `editor`, `author`, and `contributor`.
- Enforce sensible permissions: administrators manage users/settings and all posts; editors manage and publish all posts; authors manage/publish their own posts; contributors manage their own drafts but cannot publish. If the destination project already has an authorization model, integrate with it rather than duplicating it.
- Use server-only Supabase service credentials. Never expose the service-role key to client code.
- Add sign-out to the admin shell.

## 2. Admin shell and dashboard

- Create a responsive admin layout using the destination project's design tokens.
- Include persistent navigation for Dashboard, Blog, Users, and Media. Include other existing CMS destinations only if they already exist in the destination project.
- Clearly show the active navigation item and provide a sign-out action.
- On small screens, turn the fixed sidebar into an accessible drawer or compact navigation.
- Dashboard should provide quick-access cards for Blog, Users/Authors, Media, global blog settings, and a link to view the live blog.

## 3. Post management screen

Create a WordPress-style post list at `/admin/blog` with:

- A `New Post` action that immediately creates an `Untitled` draft and opens it in the editor.
- Status tabs with live counts: All (excluding trash), Published, Draft, and Trash.
- Search across title, excerpt, and author. Sanitize the server-side search string before constructing PostgREST filters.
- Post-type filter: Blog, Tutorial, and Glossary.
- Server-side pagination, 20 rows per page.
- Sortable columns for title, post type, author, status, publication date, created date, and updated date; use a stable secondary sort.
- Rows showing checkbox, featured image thumbnail, title, featured badge, slug, post type, author, tags, status, publication date, and action menu.
- Actions: Edit, Quick Edit, View published post, Move to Trash, Restore, and Permanently Delete with confirmation.
- Bulk selection and bulk Trash, Restore, and Permanent Delete.
- Quick Edit inline form for title, slug, author, post type, status, publication date/time, featured flag, and tags.
- Loading, disabled, empty, success, and failure states.
- A manual `Clear/Revalidate Blog Cache` action with feedback.
- Trash must be soft deletion (`status = trashed`); permanent delete must be a separate confirmed operation.

## 4. Full blog editor

Build a focused editor view with a top action bar, main editing canvas, right settings rail, and optional AI panel.

### Core fields and publishing

- Title
- Auto-generated slug from title until the user manually edits the slug
- Excerpt
- Rich HTML body
- Status: draft/published/trashed
- Post type: blog/tutorial/glossary
- Featured post flag
- Publication date/time
- Featured image
- Author profile snapshot: name, title, bio, avatar
- Tags and categories
- SEO title, meta description, and focus keyword
- Calculated word count and reading time at 200 words/minute, minimum one minute
- Save Draft, Publish, Update, Unpublish, View Post, and Back to Posts actions
- Show `saved`, `saving`, and `unsaved` states.
- Autosave edited posts after 30 seconds of inactivity, but never save empty initial form state while existing post data is still loading.
- Publishing should set `published_at` only on first publish unless the editor deliberately changes it. Updating an already-published post must not silently change it back to draft.
- Generate collision-safe unique slugs by appending `-2`, `-3`, etc.
- Store the latest 10 revisions containing timestamp, title, excerpt, and body HTML. Provide a revision-history UI that can preview and restore a revision.

### TipTap rich-text editor

Use TipTap with:

- Paragraphs and H1/H2/H3 headings
- Bold, italic, underline, strikethrough, and highlight
- Left, center, and right alignment
- Bulleted and numbered lists
- Blockquotes and code blocks
- Links: add/edit/remove
- Undo and redo
- Inline images selected from the media library
- Editable image alt text for every body image
- Resizable tables with a header row plus add/delete row, add/delete column, and delete-table controls
- Placeholder text and keyboard-accessible toolbar buttons with tooltips/labels
- Semantic, sanitized HTML output suitable for the public article page

### Paste and document handling

- Clean pasted Google Docs HTML: unwrap Google Docs wrapper nodes; convert styled bold/italic to semantic tags; preserve headings, lists, links, tables, and useful structure; remove editor-specific classes, IDs, styles, scripts, and unsafe markup.
- Detect clipboard image files and upload them to the media library, then replace temporary/blob/data/Google CDN image sources with permanent Supabase Storage URLs.
- If browser restrictions prevent importing pasted images, keep the text and show a clear warning directing the user to Google Doc import or the media picker.
- Do not persist `blob:` or temporary external image URLs in post HTML.

### Right settings rail

Use collapsible sections for:

- Publish/status/date/featured controls
- Featured image preview, replace, and remove
- SEO title, description, focus keyword, and character guidance
- Author autocomplete populated from managed authors; selecting an author fills name/title/bio/avatar
- Manual author details and avatar selection from Media
- Tags with Enter-to-add and remove chips
- Categories
- Blog detail layout/CTA override controls if per-post overrides are supported

## 5. AI assistant

Add an editor-side AI panel with four tabs. All endpoints must require admin authorization, validate and cap input, handle malformed model output, and return clear errors.

### Write

- Inputs: topic, tone, and length (Short 500–700, Medium 800–1100, Long 1200–1800 words).
- Generate structured JSON containing title, slug, excerpt, semantic HTML content, tags, SEO title under 60 characters, and SEO description under 160 characters.
- Let the user review before replacing populated content, or require confirmation if existing content would be overwritten.
- Treat topic/tone as untrusted data and use a system instruction resistant to prompt injection.

### Improve

- Send current HTML plus a user instruction such as improve clarity, shorten, expand, or change tone.
- Return clean HTML only and preserve useful semantic tags.
- Confirm before replacing the full editor body.

### Import

- Import `.docx` with Mammoth. Extract H1/title and, when present, `Meta Title`, `Description`, `URL Slug`, and `Primary Keyword`; convert document content to clean HTML; generate missing excerpt/tags only when needed.
- Import a public Google Doc URL by validating/extracting its document ID and fetching its HTML export. Explain that the document must be shared as “Anyone with the link can view.”
- Clean exported HTML and move embedded base64 or Google-hosted images into Supabase Storage with permanent URLs and media records.
- Enforce timeouts, supported image types, and a 10 MB limit per image.

### SEO

- Analyze title, HTML body, SEO title, description, and focus keyword.
- Return and display SEO score, readability score, keyword density, and actionable suggestions.
- Use colored score indicators with accessible text, not color alone.

Keep model/provider configuration server-side and use the destination project's existing AI abstraction. Do not hard-code business-specific DGlide context; derive the organization/product context from destination configuration.

## 6. Media library

Build `/admin/media` plus a reusable modal media picker.

- Grid/list of uploaded images with thumbnail, filename, alt text, MIME type, file size, and created date.
- Search by filename, server pagination, empty/loading/error states.
- Upload by drag-and-drop and file chooser.
- Allow JPEG, PNG, GIF, WebP, AVIF, and SVG for direct trusted uploads; cap files at 10 MB. Treat SVG safely (sanitize or disallow according to the project's security policy).
- Normalize filenames, generate collision-proof storage paths, and upload to a dedicated public blog-media bucket.
- Store `Cache-Control: public, max-age=31536000, immutable` (or Supabase's equivalent `31536000`) because filenames are immutable/UUID-based.
- Store a database media record with URL, filename, alt, width, height, MIME type, size, storage path, and created timestamp.
- Let users edit alt text.
- Deleting a managed media item removes both its Storage object and database record after confirmation. Warn if it may still be referenced by posts.
- Media picker supports search, upload-without-leaving, selection, alt-text return value, pagination, and use for featured image, body image, and author avatar.
- Server-side “import from URL” must use an explicit hostname allowlist, image MIME allowlist, size limit, timeout, and redirect/SSRF protections.

## 7. User and author management

Build `/admin/users` as a user/author directory.

- List avatar, name, email, role, title, social links, and number of non-trashed posts.
- Create, edit, and delete profiles in a panel/modal with validation and confirmation.
- Fields: name (required), email, role, job title, bio, avatar, LinkedIn, and X/Twitter.
- Avatar can be entered as a URL or chosen from Media.
- Roles: Administrator, Editor, Author, Contributor.
- Selecting an author in the post editor fills the profile snapshot.
- When a profile's name/title/bio/avatar changes, synchronize those byline snapshot fields on existing posts authored by that profile without altering unrelated post content.
- Do not automatically delete or trash an author's posts when deleting the profile; require a deliberate reassignment or leave their stored byline snapshot intact.
- Use a proper profile/user table or normalized role metadata in the new schema. Do not reproduce a fragile JSON metadata map if a schema migration is available.

## 8. Global blog detail settings

Create a settings UI and API for reusable blog-detail presentation defaults:

- Layout: sidebar left, sidebar right, or three-column
- Hide/show sidebar CTA
- Sidebar CTA eyebrow, title, text, button label, and destination
- Secondary sidebar text, button label, and destination
- Inline CTA enabled flag, title, text, button label, and destination
- Validate internal/external URLs and button labels.
- Save as a typed JSON settings row or normalized table and revalidate all blog-detail pages after updates.
- Allow optional per-post overrides, falling back to the global defaults.

## 9. Standard public blog listing page

Create a reusable, brand-neutral `/blogs` page that uses the destination project's existing public header/footer and design language.

Required behavior:

- Fetch only published posts, newest first, with a short cache/revalidation interval (approximately five minutes) or the project's equivalent tag-based cache.
- Hero with breadcrumb, page title, short introduction, and search.
- Featured-post section sourced from `is_featured`, displayed as a responsive carousel or prominent grid.
- Latest articles section.
- Complete reading library with cards showing featured image/fallback, type badge, publication date, title, optional excerpt, author/reading time when appropriate, and a clear Read More link.
- Search title, excerpt, tags, and categories.
- Filter by Blog, Tutorial, and Glossary.
- Pagination with Previous/Next, page numbers, ellipses, disabled states, and nine cards per page by default.
- Helpful empty-search state.
- Local bookmark/save toggle using one consistent localStorage key shared with the detail page.
- Responsive behavior: 3-column desktop grid, sensible tablet layout, single-column mobile layout; controls remain keyboard-accessible.
- Optional sections such as editorial picks, resource hub, newsletter, or demo CTA should use configurable destination-project content, not hard-coded DGlide copy or fake “most read/share” statistics.
- Use `next/image`, responsive `sizes`, meaningful alt text, image fallback, and subtle motion that respects `prefers-reduced-motion`.

## 10. Standard public blog detail page

Create `/blogs/[slug]` as a reusable blog article template.

- Return 404 for missing, draft, or trashed posts.
- Generate static parameters for known published posts while allowing dynamic new slugs.
- Revalidate on a short interval and explicitly revalidate listing, old slug, new slug, and dynamic detail paths after admin changes.
- Hero: Home/Blogs/current breadcrumb, post-type label, H1 title, author avatar/name/title, publication date, calculated reading time, and featured image/fallback.
- Main article renders sanitized editor HTML with complete typography for headings, paragraphs, lists, links, quotes, code, tables, and images.
- Generate stable unique IDs for H2 headings and build an automatic table of contents.
- Sidebar TOC highlights the active section on scroll, scrolls smoothly, updates the hash, and supports show-more for long articles.
- Respect the configured sidebar-left/sidebar-right/three-column layout.
- Add Like and Save interactions in localStorage using consistent keys and accessible pressed states.
- Share actions for LinkedIn, X/Twitter, WhatsApp, email, and Copy Link with success feedback.
- Render configured sidebar and inline CTAs only when enabled.
- Add an author card below the article with avatar, name, title, bio, and real configured social links.
- Add the destination project's standard final CTA/newsletter block when one exists.
- Convert recognizable FAQ sections in article content into an accessible FAQ accordion without destroying the stored editor HTML. Support heading-based or bold-question paragraph formats.
- Optimize body images through the framework image optimizer where feasible; never emit raw Storage URLs into metadata or HTML when a stable optimized URL is available.
- Ensure external links are safe and article HTML is sanitized server-side before `dangerouslySetInnerHTML`.

### Detail-page SEO

- Use SEO title/description with title/excerpt fallbacks.
- Add canonical URL.
- Add Open Graph article metadata and Twitter summary-large-image metadata.
- Include publication time, modified time, author, and tags.
- Use an optimized absolute 1200×630 image URL for social metadata when available.
- Emit valid JSON-LD for `BlogPosting`/`Article`, `BreadcrumbList`, and `FAQPage` only when FAQs exist.
- Generate/update sitemap entries for published posts and exclude drafts/trash.

## 11. Data model and Supabase migration

Create idempotent SQL migrations, TypeScript types, mappers, and indexes. Use UUID primary keys and timestamp with timezone.

### `blog_posts`

- `id`
- `title`
- `slug` unique and indexed
- `excerpt`
- `content_html`
- `status` constrained to draft/published/trashed and indexed
- `post_type` constrained to blog/tutorial/glossary and indexed
- `author_id` nullable foreign key plus author snapshot fields: name, title, bio, avatar URL
- `featured_image_url`
- `featured_image_alt`
- `seo_title`
- `seo_description`
- `focus_keyword`
- `published_at` indexed
- `is_featured` indexed
- `reading_time`
- `tags` and `categories` as typed JSONB arrays, or normalized join tables if that matches the destination project
- `detail_settings` JSONB nullable override
- `created_by`/`updated_by` when the authorization model supports it
- `created_at`, `updated_at`

### `blog_revisions`

- Use a normalized table linked to post ID, or a bounded JSONB array if the project strongly prefers it.
- Store timestamp, title, excerpt, and content HTML; retain the latest 10 per post.

### `blog_media`

- `id`, `url`, `filename`, `alt`, `width`, `height`, `mime_type`, `size`, `storage_path`, `created_at`, `uploaded_by`

### `blog_authors` / profiles

- `id`, optional auth user ID, `name`, `email`, `role`, `title`, `bio`, `avatar_url`, `linkedin`, `twitter`, `created_at`, `updated_at`

### `blog_settings`

- Unique `key`, JSONB `value`, and `updated_at`

Add appropriate foreign keys, uniqueness constraints, check constraints, indexes, updated-at triggers, and row-level security. Public/anonymous access may read only published posts and public author/media fields. Only authorized roles may mutate data. Service-role operations remain server-only.

## 12. Server data layer and API behavior

- Centralize database mapping between snake_case rows and typed camelCase domain objects.
- Public list queries must select only fields needed by cards; public detail queries must exclude revisions and private metadata.
- Admin list endpoint supports page, limit (capped at 100), search, status, excluded status, post type, sort field allowlist, and sort direction.
- Implement CRUD endpoints for posts, users/authors, media, settings, AI actions, and cache revalidation.
- Validate request bodies with the project's validation library or explicit schemas. Never pass arbitrary sort columns or filters from the client to PostgREST.
- Use consistent structured error responses and appropriate 400/401/403/404/409/500 statuses.
- Revalidate affected public paths after create, update, publish, unpublish, trash, restore, delete, slug change, and settings change.
- Add a server-side safety check that refuses a premature empty editor save which would blank an existing title/slug or silently unpublish a published post.
- Keep media filenames immutable and cacheable for one year.

## 13. Quality requirements

- TypeScript strict mode; no avoidable `any`.
- Accessible labels, focus states, keyboard operation, confirmations, semantic landmarks, and ARIA where needed.
- Fully responsive admin and public pages.
- No hard-coded brand colors/fonts/copy from the reference implementation.
- No secret leakage, unsafe service-role use, SSRF, unrestricted remote fetch, unsanitized rich HTML, or reliance on client-side authorization.
- Preserve existing destination-project functionality and avoid unrelated refactors.
- Add tests for slug collision, publication-state safety, role permissions, search sanitization, media validation, post CRUD/trash/restore, revision retention, sanitization, metadata/schema generation, and public draft exclusion.
- Run lint, typecheck, tests, and production build. Fix all issues introduced by this work.

## 14. Required implementation sequence

1. Inspect the destination repository, its design system, auth helpers, Supabase conventions, routing, caching, and existing public header/footer.
2. Write a concise implementation plan and identify files/migrations to add or change.
3. Implement schema/storage/security first, then the typed data layer and APIs.
4. Implement auth/admin shell, users, media, post list, editor, AI/import tools, and settings.
5. Implement the standard listing and detail templates using live CMS data.
6. Verify all workflows manually and with automated tests.
7. Run lint, typecheck, tests, and production build.
8. Finish with a concise report listing implemented routes, migrations, environment variables, validation performed, and any deliberate differences required by the destination project.

## Acceptance checklist

The task is complete only when an authorized administrator can sign in, create/manage authors, upload/select media, create a draft, write and format rich content, paste/import content and images, use AI tools, configure metadata, publish, view the post on the listing/detail pages, search/filter/bookmark/share it, update it without accidental unpublishing, restore an older revision, trash/restore/delete it, change global article layout/CTAs, and see public caches/SEO metadata refresh correctly—while an unauthenticated or unauthorized user cannot access or mutate admin data.
