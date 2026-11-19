import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { images } from "@/content/images";
import { CtaBand, PageHero, SectionHead, Visual } from "../ui";

export function CapabilitiesPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const { company } = c;
  const equipment = company.equipment[locale] ?? [];

  return (
    <>
      <PageHero
        kicker={d.capabilities.title}
        title={d.capabilities.lead}
        image={images.clearing}
        tone="noon"
        locale={locale}
        label={d.ui.illustrative}
      />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-px bg-forest/10 md:grid-cols-2">
          {company.capabilities.map((cap, i) => (
            <article key={cap.title.fr} className="bg-ivory p-8 md:p-12">
              <span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h-display mt-5 text-3xl text-forest">{cap.title[locale]}</h2>
              <p className="mt-4 leading-relaxed text-stone">{cap.text[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="on-dark bg-forest py-20 text-ivory md:py-28">
        <div className="container-x">
          <p className="kicker">{d.capabilities.methodKicker}</p>
          <h2 className="h-display mt-5 max-w-3xl text-4xl md:text-5xl">{d.capabilities.methodTitle}</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {company.method.map((step, i) => (
              <li key={step.title.fr} className="border-t border-gold/40 pt-6">
                <span className="font-display text-5xl text-gold/80">{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-ivory">{step.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{step.text[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {equipment.length > 0 && (
        <section className="container-x py-20 md:py-28">
          <SectionHead kicker={d.capabilities.equipmentKicker} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((e) => (
              <li key={e} className="flex gap-3 border border-forest/10 p-5 text-sm">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-x py-4 md:py-8">
        <Visual image={images.olives} locale={locale} label={d.ui.illustrative} tone="dusk" className="h-64 md:h-[28rem]" />
      </section>

      <CtaBand locale={locale} d={d} />
    </>
  );
}
