import { cache } from "react";
import { sanity } from "./sanity";
import type { SiteContent, Project, Service, Announcement, Settings, Company } from "./types";
import { projects as seedProjects, categories } from "@/content/projects";
import { services as seedServices } from "@/content/services";
import { settings as seedSettings, company as seedCompany, announcements as seedNews } from "@/content/company";

/** Projection reused for every image field: resolves the asset URL. */
const IMG = `{ "src": asset->url, alt, "illustrative": coalesce(illustrative, false), credit }`;

// NB: the internal `contracts` register is never selected by these queries.
const Q = {
  settings: `*[_type == "siteSettings"][0]{ brand, descriptor, heroTitle, heroText, legalName, formerName,
    registration, taxId, publicationDirector, host, email, phone, address, "heroImage": heroImage${IMG} }`,
  company: `*[_type == "companyProfile"][0]{ intro, approach, pillars, sectors, territories, milestones,
    capabilities, method, equipment, commitments,
    "leader": leader{ name, role, bio, education, "photo": photo${IMG} } }`,
  services: `*[_type == "service"] | order(order asc){ "key": key, order, title, summary, items, itemsHeading,
    note, tone, "image": image${IMG} }`,
  projects: `*[_type == "project"] | order(order asc){ "slug": slug.current, order, featured, category,
    services, status, title, summary, description, scope, period, location, client, tone,
    "image": image${IMG}, "gallery": coalesce(gallery[]${IMG}, []) }`,
  news: `*[_type == "announcement"] | order(date desc){ "slug": slug.current, date, title, excerpt, body,
    "image": image${IMG} }`,
};

const seed: SiteContent = {
  settings: seedSettings,
  company: seedCompany,
  services: seedServices,
  categories,
  projects: seedProjects,
  announcements: seedNews,
};

/** Drops null fields coming from GROQ so they fall back to seed values. */
function clean<T extends object>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)) as Partial<T>;
}

/**
 * Loads all site content. With Sanity configured, CMS documents win; any
 * collection that is still empty in the CMS falls back to the seed content,
 * so the site never renders half-empty during set-up.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!sanity) return seed;
  try {
    const [settings, company, services, projects, announcements] = await Promise.all([
      sanity.fetch<Settings | null>(Q.settings, {}, { next: { revalidate: 300 } }),
      sanity.fetch<Company | null>(Q.company, {}, { next: { revalidate: 300 } }),
      sanity.fetch<Service[]>(Q.services, {}, { next: { revalidate: 300 } }),
      sanity.fetch<Project[]>(Q.projects, {}, { next: { revalidate: 300 } }),
      sanity.fetch<Announcement[]>(Q.news, {}, { next: { revalidate: 300 } }),
    ]);
    return {
      settings: { ...seed.settings, ...clean(settings) },
      company: { ...seed.company, ...clean(company) },
      services: services?.length ? services : seed.services,
      categories,
      projects: projects?.length ? projects.map((p) => ({ ...p, contracts: [] })) : seed.projects,
      announcements: announcements?.length ? announcements : seed.announcements,
    };
  } catch (err) {
    console.error("[content] Sanity fetch failed, using seed content", err);
    return seed;
  }
});
