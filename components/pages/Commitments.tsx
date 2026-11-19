import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { images } from "@/content/images";
import { CtaBand, PageHero } from "../ui";

export function CommitmentsPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  return (
    <>
      <PageHero
        kicker={d.commitments.title}
        title={d.commitments.lead}
        image={images.foliage}
        tone="mist"
        locale={locale}
        label={d.ui.illustrative}
      />
      <section className="container-x py-20 md:py-28">
        <ol className="divide-y divide-forest/10 border-y border-forest/10">
          {c.company.commitments.map((item, i) => (
            <li key={item.title.fr} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <span className="font-display text-5xl text-gold md:col-span-2">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h-display text-3xl text-forest md:col-span-4 md:text-4xl">{item.title[locale]}</h2>
              <p className="text-lg leading-relaxed text-stone md:col-span-6">{item.text[locale]}</p>
            </li>
          ))}
        </ol>
      </section>
      <CtaBand locale={locale} d={d} />
    </>
  );
}
