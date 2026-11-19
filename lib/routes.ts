import { isLocale, locales, type L, type Locale } from "./i18n";

export type PageKey =
  | "home"
  | "about"
  | "expertise"
  | "projects"
  | "capabilities"
  | "commitments"
  | "contact"
  | "news"
  | "legal"
  | "privacy";

/**
 * Locale-specific URL segments. French URLs are in French; Arabic and English
 * share readable Latin slugs (Arabic slugs would be percent-encoded in links).
 */
export const pageSlugs: Record<PageKey, L> = {
  home: { fr: "", ar: "", en: "" },
  about: { fr: "notre-entreprise", ar: "about", en: "about" },
  expertise: { fr: "nos-expertises", ar: "expertise", en: "expertise" },
  projects: { fr: "nos-realisations", ar: "projects", en: "projects" },
  capabilities: { fr: "nos-moyens", ar: "capabilities", en: "capabilities" },
  commitments: { fr: "nos-engagements", ar: "commitments", en: "commitments" },
  contact: { fr: "contact", ar: "contact", en: "contact" },
  news: { fr: "actualites", ar: "news", en: "news" },
  legal: { fr: "mentions-legales", ar: "legal", en: "legal" },
  privacy: { fr: "confidentialite", ar: "privacy", en: "privacy" },
};

export const navKeys: PageKey[] = [
  "home",
  "about",
  "expertise",
  "projects",
  "capabilities",
  "commitments",
  "contact",
];

/** Pages that accept a second segment (detail pages). */
const withDetail: PageKey[] = ["projects", "news"];

/** Always ends with "/" (trailingSlash: true) so static hosts serve folder/index.html directly. */
export function href(locale: Locale, key: PageKey, sub?: string) {
  const parts = [locale, pageSlugs[key][locale], sub].filter(Boolean);
  return "/" + parts.join("/") + "/";
}

export type Resolved = { key: PageKey; sub?: string };

export function resolve(locale: Locale, segments: string[] = []): Resolved | null {
  if (segments.length === 0) return { key: "home" };
  if (segments.length > 2) return null;
  const [first, second] = segments;
  const key = (Object.keys(pageSlugs) as PageKey[]).find(
    (k) => k !== "home" && pageSlugs[k][locale] === first,
  );
  if (!key) return null;
  if (second && !withDetail.includes(key)) return null;
  return { key, sub: second };
}

/** Same page in another language — used by the language selector. */
export function switchLocalePath(pathname: string, target: Locale) {
  const [maybeLocale, ...rest] = pathname.split("/").filter(Boolean);
  if (!isLocale(maybeLocale)) return `/${target}/`;
  const r = resolve(maybeLocale, rest.map(decodeURIComponent));
  return r ? href(target, r.key, r.sub) : `/${target}/`;
}

/** hreflang map for <link rel="alternate">. */
export function alternates(key: PageKey, sub?: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = href(l, key, sub);
  languages["x-default"] = href("fr", key, sub);
  return languages;
}
