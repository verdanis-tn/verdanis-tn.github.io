import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { href } from "@/lib/routes";
import { Arrow, CtaBand, ProjectCard, SectionHead, Visual } from "../ui";

export function HomePage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const { settings, company, services, projects, categories } = c;
  const featured = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
  const cat = (key: string) => categories.find((x) => x.key === key);

  return (
    <>
      {/* HERO */}
      <section className="on-dark relative isolate flex min-h-[min(calc(100svh-5rem),58rem)] items-end overflow-hidden text-ivory">
        <Visual
          image={settings.heroImage}
          locale={locale}
          label={d.ui.illustrative}
          tone="dusk"
          overlay
          priority
          zoom
          className="!absolute inset-0 -z-10"
        />
        <div className="container-x pb-16 pt-40 md:pb-24">
          <p className="kicker animate-rise">{settings.descriptor[locale]}</p>
          <h1 className="h-display animate-rise delay-1 mt-6 max-w-5xl text-[2.9rem] md:text-[5.6rem]">
            {settings.heroTitle[locale]}
          </h1>
          <p className="animate-rise delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">
            {settings.heroText[locale]}
          </p>
          <div className="animate-rise delay-3 mt-10 flex flex-wrap gap-4">
            <Link href={href(locale, "projects")} className="btn btn-gold">
              {d.ui.discoverProjects}
              <Arrow />
            </Link>
            <Link href={href(locale, "contact")} className="btn btn-ghost text-ivory">
              {d.ui.contactUs}
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <p className="kicker">{d.home.introKicker}</p>
        </div>
        <div className="md:col-span-8">
          <p className="h-display text-3xl leading-snug text-forest md:text-[2.6rem]">{company.intro[locale]}</p>
          <Link href={href(locale, "about")} className="mt-10 inline-flex items-center gap-3 font-semibold text-moss">
            <span className="link-underline">{d.ui.learnMore}</span>
            <Arrow />
          </Link>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead kicker={d.home.expertiseKicker} title={d.home.expertiseTitle} />
          <ol className="mt-14 grid gap-px overflow-hidden border border-forest/10 bg-forest/10 md:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <li key={s.key} className="group bg-ivory">
                <Link
                  href={`${href(locale, "expertise")}#${s.key}`}
                  className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-forest hover:text-ivory"
                >
                  <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h-display mt-8 text-2xl text-forest transition-colors group-hover:text-ivory">
                    {s.title[locale]}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone transition-colors group-hover:text-ivory/75">
                    {s.summary[locale]}
                  </p>
                  <Arrow className="mt-auto h-5 w-5 pt-8 text-moss transition-colors group-hover:text-gold" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead kicker={d.home.projectsKicker} title={d.home.projectsTitle} />
          <Link href={href(locale, "projects")} className="inline-flex items-center gap-3 font-semibold text-moss">
            <span className="link-underline">{d.ui.allProjects}</span>
            <Arrow />
          </Link>
        </div>
        <div className="container-x mt-12 grid gap-4 md:grid-cols-3">
          {featured.slice(0, 4).map((p, i) => (
            <div key={p.slug} className={i === 0 || i === 3 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} locale={locale} d={d} category={cat(p.category)} size={i === 0 || i === 3 ? "lg" : "md"} />
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="on-dark bg-forest py-20 text-ivory md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">{d.home.approachKicker}</p>
            <p className="h-display mt-6 text-3xl leading-snug md:text-4xl">{company.approach[locale]}</p>
          </div>
          <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {company.pillars.map((p) => (
              <li key={p.title.fr} className="border-t border-gold/40 pt-6">
                <h3 className="font-display text-xl text-gold-soft">{p.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{p.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTORS + TERRITORIES */}
      <section className="container-x grid gap-16 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <p className="kicker">{d.home.sectorsKicker}</p>
          <ul className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
            {company.sectors.map((s) => (
              <li key={s.title.fr} className="py-6">
                <h3 className="font-display text-xl text-forest">{s.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{s.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">{d.home.territoriesKicker}</p>
          <ul className="mt-8 space-y-4">
            {company.territories.map((tr, i) => (
              <li key={tr.region.fr} className="flex gap-6 bg-sand/60 p-7">
                <span className="font-display text-4xl leading-none text-gold">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-forest">{tr.region[locale]}</h3>
                  <p className="mt-2 text-sm text-stone">{tr.places[locale]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} d={d} />
    </>
  );
}
