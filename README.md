# VERDANIS — company website

Trilingual corporate website (French · العربية · English) for the Tunisian green-space and infrastructure-maintenance company led by Rabeh Belaid, agricultural engineer (formerly *Best Green Garden*).

> **Status: preview, do not launch.** The site is `noindex` and shows a preview banner until `NEXT_PUBLIC_LAUNCH_APPROVED=true`. Set that only after the pre-publication verification report has been signed off. That report is kept in `private/` (git-ignored) because the repository is public.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Sanity (headless CMS, separate Studio in [studio/](studio/)) · Nodemailer (SMTP) for the inquiry form.

## Run locally

```bash
npm install
cp .env.example .env.local   # everything optional for a local preview
npm run dev                  # http://localhost:3000 → redirects to /fr
```

With no Sanity project configured, the site renders the seed content in [content/](content/).

## URLs

| Page | FR | AR (RTL) | EN |
|---|---|---|---|
| Home | `/fr` | `/ar` | `/en` |
| About | `/fr/notre-entreprise` | `/ar/about` | `/en/about` |
| Expertise | `/fr/nos-expertises` | `/ar/expertise` | `/en/expertise` |
| Projects | `/fr/nos-realisations[/slug]` | `/ar/projects[/slug]` | `/en/projects[/slug]` |
| Capabilities | `/fr/nos-moyens` | `/ar/capabilities` | `/en/capabilities` |
| Commitments | `/fr/nos-engagements` | `/ar/commitments` | `/en/commitments` |
| Contact | `/fr/contact` | `/ar/contact` | `/en/contact` |
| News, Legal, Privacy | `/fr/actualites`, `/fr/mentions-legales`, `/fr/confidentialite` | `/ar/news` … | `/en/news` … |

The language selector (FR | العربية | EN) keeps the current page. Every page has `hreflang` alternates and translated metadata. The locale-less `/` redirects by `Accept-Language` (French by default), see [proxy.ts](proxy.ts).

## Project layout

```
app/[locale]/[[...slug]]/page.tsx   single router: resolves localized slugs → page components
app/api/contact/route.ts            inquiry endpoint (validation, honeypot, timing, rate limit, optional Turnstile, magic-byte file check)
components/pages/                   Home, About, Expertise, Projects, Capabilities, Commitments, Contact, News, Legal
content/                            seed content (FR/AR/EN) — also the import source for Sanity
lib/                                i18n, localized routes, dictionary (UI strings), content loader, types
studio/                             Sanity Studio (administration)
docs/                               verification report, brand guide, handover guide
```

## Content rules built into the code

- **No money, no tender numbers.** Contract values and lot / tender references are not stored anywhere in this repository.
- Each editorial project keeps its individual contracts in an **internal register** (`contracts`), which is never rendered or queried by the site.
- `location` and `client` are only rendered when set. They are left empty when they have not been confirmed.
- Every image has an `illustrative` flag. Illustrative images get a visible "Image d'illustration" caption. The current images are Unsplash photos (credits in `public/images/illustrative/credits.json`).
- The equipment list stays hidden until a verified list is entered.

## CMS (Sanity)

1. Create a free project at sanity.io/manage **with the company's account**. Note the project ID and create the `production` dataset.
2. `studio/.env` → `SANITY_STUDIO_PROJECT_ID=…`; then `cd studio && npm install && npm run dev` (local) or `npm run deploy` (hosted at `https://<name>.sanity.studio`).
3. Website `.env.local` → `NEXT_PUBLIC_SANITY_PROJECT_ID=…`, plus a write token for the one-off import: `npm run seed`.
4. In sanity.io/manage → API → CORS origins, add the website URL.

Drafts edited in the Studio are invisible on the site until **Publish** is pressed (the site reads the `published` perspective only), which gives the review-before-publication workflow. Pages revalidate every 5 minutes.

## Contact form

**GitHub Pages:** set the repository variable `FORM_ENDPOINT` (Formspree). **Node host:** set `CONTACT_TO_EMAIL` (the company's approved address) and the SMTP variables. Until then the API answers `503 unavailable` and the form shows a translated "not active yet" message. Attachments (PDF/JPG/PNG/DOCX ≤ 5 MB) are checked by file signature and forwarded by e-mail, never written to disk. For stronger spam protection, add Cloudflare Turnstile keys.

## Deploy

**GitHub Pages (organisation site, default):** `npm run build:pages` produces a static site in `out/`. The workflow `.github/workflows/deploy-pages.yml` builds and publishes it on every push to `main`. Step-by-step guide: [docs/DEPLOY_GITHUB_PAGES.md](docs/DEPLOY_GITHUB_PAGES.md). In static mode the contact form posts to an external service (`NEXT_PUBLIC_FORM_ENDPOINT`, e.g. Formspree).

**Node host (Vercel, alternative):** `npm run build` keeps the `/api/contact` route (SMTP, attachments) and the `Accept-Language` redirect in `proxy.ts`. Add the environment variables from `.env.example`.

Keep the launch flag off until sign-off.

See [docs/HANDOVER.md](docs/HANDOVER.md) for transferring the domain, repository, hosting, CMS and billing to company-owned accounts.
