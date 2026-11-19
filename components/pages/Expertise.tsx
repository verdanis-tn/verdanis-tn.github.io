import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { href } from "@/lib/routes";
import { images } from "@/content/images";
import { Arrow, CtaBand, PageHero, Visual } from "../ui";

export function ExpertisePage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const services = [...c.services].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        kicker={d.expertise.title}
        title={d.expertise.lead}
        image={images.greenSpaces}
        tone="dawn"
        locale={locale}
        label={d.ui.illustrative}
      />

      {/* Index */}
      <nav aria-label={d.expertise.title} className="border-b border-forest/10 bg-ivory">
        <ul className="container-x flex gap-8 overflow-x-auto py-5 text-sm font-medium text-stone">
          {services.map((s) => (
            <li key={s.key} className="shrink-0">
              <a href={`#${s.key}`} className="link-underline hover:text-forest">
                {s.title[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => {
        const related = c.projects.filter((p) => p.services.includes(s.key));
        const flip = i % 2 === 1;
        return (
          <section key={s.key} id={s.key} className={`scroll-mt-24 py-20 md:py-28 ${flip ? "bg-sand/60" : ""}`}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Visual
                image={s.image}
                locale={locale}
                label={d.ui.illustrative}
                tone={s.tone}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`aspect-[4/3] ${flip ? "lg:order-2" : ""}`}
              />
              <div>
                <span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="h-display mt-4 text-4xl text-forest md:text-5xl">{s.title[locale]}</h2>
                <p className="mt-6 text-lg leading-relaxed text-stone">{s.summary[locale]}</p>

                <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-moss rtl:tracking-normal">
                  {s.itemsHeading?.[locale] ?? d.expertise.covers}
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {s.items[locale].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-anthracite">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                {s.note && (
                  <p className="mt-8 border-s-2 border-gold ps-5 text-sm leading-relaxed text-stone">{s.note[locale]}</p>
                )}

                {related.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-moss rtl:tracking-normal">
                      {d.expertise.seeProjects}
                    </h3>
                    <ul className="mt-3 divide-y divide-forest/10 border-y border-forest/10">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={href(locale, "projects", p.slug)}
                            className="group flex items-center justify-between gap-4 py-3 text-sm text-forest"
                          >
                            <span className="link-underline">{p.title[locale]}</span>
                            <Arrow className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand locale={locale} d={d} />
    </>
  );
}
