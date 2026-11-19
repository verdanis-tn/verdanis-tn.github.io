import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { Project, SiteContent } from "@/lib/types";
import { href } from "@/lib/routes";
import { images } from "@/content/images";
import { Arrow, CtaBand, PageHero, ProjectCard, StatusBadge, Visual } from "../ui";

export function ProjectsPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const sorted = [...c.projects].sort((a, b) => a.order - b.order);
  const groups = c.categories
    .map((cat) => ({ cat, items: sorted.filter((p) => p.category === cat.key) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        kicker={d.projects.title}
        title={d.projects.lead}
        image={images.highway}
        tone="noon"
        locale={locale}
        label={d.ui.illustrative}
      />

      <nav aria-label={d.projects.title} className="sticky top-20 z-30 border-b border-forest/10 bg-ivory/95 backdrop-blur">
        <ul className="container-x flex gap-8 overflow-x-auto py-4 text-sm font-medium text-stone">
          {groups.map(({ cat }) => (
            <li key={cat.key} className="shrink-0">
              <a href={`#${cat.key}`} className="link-underline hover:text-forest">
                {cat.label[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map(({ cat, items }, gi) => (
        <section key={cat.key} id={cat.key} className={`scroll-mt-36 py-16 md:py-24 ${gi % 2 ? "bg-sand/60" : ""}`}>
          <div className="container-x">
            <div className="flex items-baseline gap-5">
              <span className="font-display text-gold">{String(gi + 1).padStart(2, "0")}</span>
              <h2 className="h-display text-3xl text-forest md:text-5xl">{cat.title[locale]}</h2>
            </div>
            <div className={`mt-10 grid gap-4 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
              {items.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} d={d} category={cat} size="lg" />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand locale={locale} d={d} />
    </>
  );
}

export function ProjectDetailPage({
  locale,
  d,
  c,
  project,
}: {
  locale: Locale;
  d: Dictionary;
  c: SiteContent;
  project: Project;
}) {
  const cat = c.categories.find((x) => x.key === project.category);
  const others = c.projects.filter((p) => p.slug !== project.slug).sort((a, b) => a.order - b.order).slice(0, 3);
  const facts: [string, string | undefined][] = [
    [d.project.category, cat?.label[locale]],
    [d.project.location, project.location?.[locale]],
    [d.project.period, project.period[locale]],
    [d.project.client, project.client?.[locale]],
  ];

  return (
    <>
      <section className="on-dark relative isolate flex min-h-[min(78vh,50rem)] items-end overflow-hidden text-ivory">
        <Visual
          image={project.image}
          locale={locale}
          label={d.ui.illustrative}
          tone={project.tone}
          overlay
          priority
          zoom
          className="!absolute inset-0 -z-10"
        />
        <div className="container-x pb-14 pt-32 md:pb-20">
          <Link
            href={href(locale, "projects")}
            className="animate-rise inline-flex items-center gap-3 text-sm text-ivory/75 hover:text-ivory"
          >
            <Arrow className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {d.ui.backToProjects}
          </Link>
          <div className="animate-rise delay-1 mt-8 flex flex-wrap items-center gap-5">
            {cat && (
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-soft rtl:tracking-normal">
                {cat.title[locale]}
              </span>
            )}
            <StatusBadge status={project.status} d={d} />
          </div>
          <h1 className="h-display animate-rise delay-2 mt-5 max-w-5xl text-[2.5rem] md:text-7xl">{project.title[locale]}</h1>
          <p className="animate-rise delay-3 mt-6 max-w-2xl text-lg text-ivory/85">{project.summary[locale]}</p>
        </div>
      </section>

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="divide-y divide-forest/10 border-y border-forest/10">
            {facts
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="py-5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-moss rtl:tracking-normal">{k}</dt>
                  <dd className="mt-1.5 font-display text-lg text-forest">{v}</dd>
                </div>
              ))}
            <div className="py-5">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-moss rtl:tracking-normal">
                {d.project.status}
              </dt>
              <dd className="mt-1.5 font-display text-lg text-forest">
                {project.status === "ongoing" ? d.project.ongoing : d.project.completed}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="prose-body text-xl leading-relaxed text-anthracite">
            {project.description[locale].map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <h2 className="mt-14 text-xs font-semibold uppercase tracking-[0.18em] text-moss rtl:tracking-normal">
            {d.project.scope}
          </h2>
          <ul className="mt-5 grid gap-px bg-forest/10 sm:grid-cols-2">
            {project.scope[locale].map((s) => (
              <li key={s} className="flex gap-3 bg-ivory p-5 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="container-x pb-20 md:pb-28">
          <h2 className="kicker">{d.project.gallery}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Visual
                key={img.src + i}
                image={img}
                locale={locale}
                label={d.ui.illustrative}
                tone={project.tone}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={i === 0 && project.gallery.length % 2 === 1 ? "aspect-[16/7] md:col-span-2" : "aspect-[4/3]"}
              />
            ))}
          </div>
        </section>
      )}

      <section className="bg-sand/60 py-20 md:py-24">
        <div className="container-x">
          <p className="kicker">{d.ui.otherProjects}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} d={d} category={c.categories.find((x) => x.key === p.category)} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} d={d} />
    </>
  );
}
