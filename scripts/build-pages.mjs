/**
 * Static build for GitHub Pages → out/
 *
 *   npm run build:pages
 *
 * GitHub Pages only serves files, so the two server-only pieces (the /api
 * contact route and the locale proxy) are set aside during the export and
 * restored afterwards. The contact form then posts to NEXT_PUBLIC_FORM_ENDPOINT.
 */
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const STASH = ".pages-stash";
const moves = [
  ["app/api", `${STASH}/api`],
  ["proxy.ts", `${STASH}/proxy.ts`],
];

mkdirSync(STASH, { recursive: true });
for (const [from, to] of moves) if (existsSync(from)) renameSync(from, to);

let status = 1;
try {
  const res = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true", NEXT_PUBLIC_STATIC_EXPORT: "true" },
  });
  status = res.status ?? 1;
} finally {
  for (const [from, to] of moves) if (existsSync(to)) renameSync(to, from);
  rmSync(STASH, { recursive: true, force: true });
}
if (status !== 0) process.exit(status);

const approved = process.env.NEXT_PUBLIC_LAUNCH_APPROVED === "true";
const robots = approved ? "" : '<meta name="robots" content="noindex, nofollow">';
const style = `body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#17372F;color:#F6F5F0;font-family:system-ui,sans-serif;text-align:center}
a{color:#D8CBB0;margin:0 .8rem;font-weight:600;text-decoration:none}a:hover{text-decoration:underline}
h1{font-family:Georgia,serif;font-weight:400;letter-spacing:.3em;font-size:1.6rem;margin:0 0 1.5rem}p{opacity:.8;margin:.4rem 0}`;
const links = '<p><a href="/fr/">Français</a><a href="/ar/" lang="ar">العربية</a><a href="/en/">English</a></p>';

// Root: send visitors to their language (French by default).
writeFileSync(
  "out/index.html",
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>VERDANIS</title>${robots}<link rel="icon" href="/brand/symbol.svg">
<script>(function(){var l=(navigator.languages||[navigator.language||"fr"]).map(function(x){return String(x).slice(0,2).toLowerCase()});
var t=l.find(function(x){return x==="fr"||x==="ar"||x==="en"})||"fr";location.replace("/"+t+"/");})();</script>
<noscript><meta http-equiv="refresh" content="0; url=/fr/"></noscript><style>${style}</style></head>
<body><main><h1>VERDANIS</h1>${links}</main></body></html>`,
);

// GitHub Pages serves /404.html for any unknown path.
writeFileSync(
  "out/404.html",
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>404 — VERDANIS</title><meta name="robots" content="noindex"><link rel="icon" href="/brand/symbol.svg"><style>${style}</style></head>
<body><main><h1>VERDANIS</h1><p>Page introuvable · الصفحة غير موجودة · Page not found</p>${links}</main></body></html>`,
);

writeFileSync("out/.nojekyll", "");
if (process.env.CUSTOM_DOMAIN) writeFileSync("out/CNAME", process.env.CUSTOM_DOMAIN.trim() + "\n");

console.log("\nStatic site ready in out/ (GitHub Pages).");
