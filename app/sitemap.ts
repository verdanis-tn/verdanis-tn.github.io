import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { alternates, href, pageSlugs, type PageKey } from "@/lib/routes";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.launchApproved) return [];
  const c = await getContent();
  const abs = (path: string) => new URL(path, site.url).toString();
  const entry = (key: PageKey, sub?: string) =>
    locales.map((l) => ({
      url: abs(href(l, key, sub)),
      alternates: {
        languages: Object.fromEntries(Object.entries(alternates(key, sub)).map(([k, v]) => [k, abs(v)])),
      },
    }));
  return [
    ...(Object.keys(pageSlugs) as PageKey[]).flatMap((k) => entry(k)),
    ...c.projects.flatMap((p) => entry("projects", p.slug)),
    ...c.announcements.flatMap((n) => entry("news", n.slug)),
  ];
}
