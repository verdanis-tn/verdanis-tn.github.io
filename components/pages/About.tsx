import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { images } from "@/content/images";
import { CtaBand, PageHero, SectionHead, Visual } from "../ui";
import { BrandSymbol } from "../Logo";

export function AboutPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const { company, settings } = c;
  const leader = company.leader;

  return (
    <>
      <PageHero
        kicker={d.about.title}
        title={d.about.lead}
        image={images.olives}
        tone="gold"
        locale={locale}
        label={d.ui.illustrative}
      />

      {/* Identity */}
      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="kicker">{d.about.identityKicker}</p>
        </div>
        <div className="md:col-span-8">
          <p className="h-display text-3xl leading-snug text-forest md:text-4xl">{company.intro[locale]}</p>
          {settings.legalName && (
            <p className="mt-8 text-sm text-stone" dir="auto">
              {settings.legalName}
              {settings.registration && <> · {settings.registration}</>}
            </p>
          )}
        </div>
      </section>

      {/* Approach & pillars */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead kicker={d.about.approachKicker} />
            <p className="mt-6 text-xl leading-relaxed text-anthracite">{company.approach[locale]}</p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-6">
            {company.pillars.map((p) => (
              <li key={p.title.fr} className="bg-ivory p-7">
                <h3 className="font-display text-xl text-forest">{p.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{p.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Milestones */}
      <section className="container-x py-20 md:py-28">
        <SectionHead kicker={d.about.milestonesKicker} />
        <ol className="relative mt-12 grid gap-10 border-s border-gold/50 ps-8 md:grid-cols-4 md:border-s-0 md:border-t md:ps-0 md:pt-10">
          {company.milestones.map((m) => (
            <li key={m.year} className="relative">
              <span
                className="absolute -start-[2.33rem] top-2 h-2.5 w-2.5 rounded-full bg-gold md:-top-[2.95rem] md:start-0"
                aria-hidden="true"
              />
              <p className="font-display text-4xl text-forest">{m.year}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone">{m.text[locale]}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Leadership */}
      {leader && (
        <section className="on-dark bg-forest py-20 text-ivory md:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker">{d.about.leadershipKicker}</p>
              <div className="mt-8 aspect-[4/5] max-w-xs overflow-hidden bg-moss">
                {leader.photo ? (
                  <div className="relative h-full w-full">
                    <Image src={leader.photo.src} alt={leader.photo.alt[locale]} fill className="object-cover" sizes="320px" />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BrandSymbol className="h-20 w-20 opacity-80" />
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="h-display text-4xl md:text-5xl">{leader.name}</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft rtl:tracking-normal">
                {leader.role[locale]}
              </p>
              <div className="prose-body mt-8 space-y-0 text-lg leading-relaxed text-ivory/80">
                {leader.bio[locale].map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft rtl:tracking-normal">
                {d.about.education}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-ivory/75">
                {leader.education[locale].map((e) => (
                  <li key={e} className="flex gap-3">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-4">
        <Visual image={images.foliage} locale={locale} label={d.ui.illustrative} tone="mist" className="h-56 md:h-80" overlay />
      </section>

      <CtaBand locale={locale} d={d} />
    </>
  );
}
