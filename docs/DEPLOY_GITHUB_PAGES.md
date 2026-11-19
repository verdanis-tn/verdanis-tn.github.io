# Hosting on GitHub Pages under an organisation

The result is the site at `https://<org>.github.io/`, the same setup as `etbouaret.github.io`.

Difference from a plain HTML / Quarto site: this is a Next.js project, so it has to be **built** before GitHub can serve it. The workflow in `.github/workflows/deploy-pages.yml` does this automatically on every push to `main`. Pages must therefore use **GitHub Actions** as its source, not "Deploy from a branch".

## 1. Create the organisation

1. github.com → your avatar → **Your organizations** → **New organization** → **Free**.
2. Organisation name: this becomes the address `https://<name>.github.io`. Suggestions: `verdanis`, `verdanis-tn`. VERDANIS is still a provisional brand, so if the name may change, prefer a neutral name or plan for a custom domain (step 6).
3. Contact email: the company's address. "This organisation belongs to": **My personal account**. Later, add Rabeh as a second **Owner** (People → Invite member → role Owner).

## 2. Create the repository

In the organisation → **New repository**:

- Name: exactly **`<org>.github.io`** (for example `verdanis.github.io`). This exact name puts the site at the root URL.
- Visibility: **Public**. GitHub Pages is free only for public repositories. Nothing confidential is in the repo: no contract amounts, and the verification report stays in the git-ignored `private/` folder.
- Do **not** add a README, .gitignore or licence (the repo must be empty).

## 3. Push the code

```powershell
cd D:\verdanis_website
git remote add origin https://github.com/<org>/<org>.github.io.git
git push -u origin main
```

The first push opens a browser window to sign in to GitHub (Git Credential Manager).

## 4. Turn on Pages

Repository → **Settings** → **Pages** → *Build and deployment* → **Source: GitHub Actions**.

Then go to **Actions** → **Deploy to GitHub Pages**. The run triggered by the push may have failed because Pages was not enabled yet. If so, open it → **Re-run all jobs**. When it is green, the site is live at `https://<org>.github.io/` (it redirects to `/fr/`, `/ar/` or `/en/` according to the browser language).

## 5. Activate the contact form (Formspree)

GitHub Pages cannot run server code, so form submissions go through Formspree.

1. Create an account at formspree.io **with the company's email address**, then **New form**. Copy the endpoint (`https://formspree.io/f/xxxxxxx`).
2. GitHub repo → **Settings → Secrets and variables → Actions → Variables** → **New repository variable**:
   `FORM_ENDPOINT` = `https://formspree.io/f/xxxxxxx`
3. **Actions → Deploy to GitHub Pages → Run workflow**.
4. Send a test enquiry from the site, then confirm it in the email Formspree sends.

Free plan: 50 submissions per month, no file attachments, so the attachment field is hidden. On a paid plan, also add the variable `FORM_ALLOWS_FILES` = `true`.

Until `FORM_ENDPOINT` is set, the form shows a translated "not active yet" message.

## 6. Custom domain (optional, e.g. `www.verdanis.tn`)

1. Buy the domain **in the company's name**.
2. At the domain registrar, create a `CNAME` record from `www` to `<org>.github.io`. For the bare domain, create `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
3. Add these repository variables: `CUSTOM_DOMAIN` = `www.verdanis.tn` and `SITE_URL` = `https://www.verdanis.tn`. Then re-run the workflow.
4. Settings → Pages → Custom domain → `www.verdanis.tn` → **Enforce HTTPS** (once the certificate is issued).

## 7. Repository variables (summary)

| Variable | Purpose | Default |
|---|---|---|
| `FORM_ENDPOINT` | Formspree endpoint for the contact form | form inactive |
| `FORM_ALLOWS_FILES` | `true` if the form plan accepts attachments | `false` |
| `LAUNCH_APPROVED` | `true` **only after** the verification report is signed off: removes the preview banner and allows search-engine indexing | `false` |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` | Load content from the CMS | seed content in `content/` |
| `SITE_URL` | Public address (canonical links, sitemap) | `https://<org>.github.io` |
| `CUSTOM_DOMAIN` | Writes the `CNAME` file | none |

Any change of variable takes effect at the next workflow run.

## 8. Updating the site

- **Code or seed content:** commit and push to `main`. The site redeploys in about two minutes.
- **Sanity CMS edits:** the site is static, so publishing in Sanity does not update it by itself. Either click **Actions → Run workflow**, or automate it: in sanity.io/manage → API → Webhooks, add a webhook to `https://api.github.com/repos/<org>/<org>.github.io/dispatches` with the body `{"event_type":"sanity-publish"}`. It needs a fine-grained GitHub token with *Contents: read & write* on this repository, sent as `Authorization: Bearer <token>`.
- **Admin panel (Studio):** host it free at `https://<name>.sanity.studio` with `cd studio && npx sanity deploy`.

## Local preview of exactly what GitHub serves

```powershell
cd D:\verdanis_website
.nodeenv\npm.cmd run build:pages
python -m http.server 3000 -d out    # → http://localhost:3000
```
