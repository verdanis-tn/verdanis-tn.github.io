import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, type Locale } from "@/lib/i18n";
import { alternates, href, pageSlugs, resolve, type PageKey } from "@/lib/routes";
import { getDictionary } from "@/lib/dictionary";
import { getContent } from "@/lib/content";
import { HomePage } from "@/components/pages/Home";
import { AboutPage } from "@/components/pages/About";
import { ExpertisePage } from "@/components/pages/Expertise";
import { ProjectsPage, ProjectDetailPage } from "@/components/pages/Projects";
import { CapabilitiesPage } from "@/components/pages/Capabilities";
import { CommitmentsPage } from "@/components/pages/Commitments";
import { ContactPage } from "@/components/pages/Contact";
import { NewsPage, NewsDetailPage } from "@/components/pages/News";
import { LegalPage, PrivacyPage } from "@/components/pages/Legal";

type Params = Promise<{ locale: string; slug?: string[] }>;

// All pages are pre-rendered at build time (works for static export and servers).
export const dynamicParams = false;

export async function generateStaticParams() {
  const c = await getContent();
  const out: { locale: string; slug: string[] }[] = [];
  for (const locale of locales) {
    for (const key of Object.keys(pageSlugs) as PageKey[]) {
      const seg = pageSlugs[key][locale];
      out.push({ locale, slug: seg ? [seg] : [] });
    }
    for (const p of c.projects) out.push({ locale, slug: [pageSlugs.projects[locale], p.slug] });
    for (const n of c.announcements) out.push({ locale, slug: [pageSlugs.news[locale], n.slug] });
  }
  return out;
}

async function load(params: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const route = resolve(locale, (slug ?? []).map(decodeURIComponent));
  if (!route) notFound();
  const c = await getContent();
  const project = route.key === "projects" && route.sub ? c.projects.find((p) => p.slug === route.sub) : undefined;
  const news = route.key === "news" && route.sub ? c.announcements.find((n) => n.slug === route.sub) : undefined;
  if (route.sub && !project && !news) notFound();
  return { locale, route, c, d: getDictionary(locale), project, news };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, route, c, d, project, news } = await load(params);
  const brand = c.settings.brand;
  const title = project
    ? project.title[locale]
    : news
      ? news.title[locale]
      : route.key === "home"
        ? `${brand} — ${c.settings.descriptor[locale]}`
        : d.nav[route.key];
  const description = project ? project.summary[locale] : news ? news.excerpt[locale] : d.meta[route.key];
  const image = project?.image?.src ?? news?.image?.src ?? c.settings.heroImage?.src;

  return {
    title: route.key === "home" ? { absolute: title } : `${title} | ${brand}`,
    description,
    alternates: { canonical: href(locale, route.key, route.sub), languages: alternates(route.key, route.sub) },
    openGraph: {
      title,
      description,
      siteName: brand,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, route, c, d, project, news } = await load(params);
  const props = { locale, d, c };

  switch (route.key) {
    case "home":
      return <HomePage {...props} />;
    case "about":
      return <AboutPage {...props} />;
    case "expertise":
      return <ExpertisePage {...props} />;
    case "projects":
      return project ? <ProjectDetailPage {...props} project={project} /> : <ProjectsPage {...props} />;
    case "capabilities":
      return <CapabilitiesPage {...props} />;
    case "commitments":
      return <CommitmentsPage {...props} />;
    case "contact":
      return <ContactPage {...props} />;
    case "news":
      return news ? <NewsDetailPage locale={locale} d={d} item={news} /> : <NewsPage {...props} />;
    case "legal":
      return <LegalPage {...props} />;
    case "privacy":
      return <PrivacyPage {...props} />;
  }
}
