import Link from "next/link";
import { formatDate, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { Announcement, SiteContent } from "@/lib/types";
import { href } from "@/lib/routes";
import { Arrow, Visual } from "../ui";

export function NewsPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const items = [...c.announcements].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="on-dark bg-forest text-ivory">
        <div className="container-x pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="kicker">{d.news.title}</p>
          <h1 className="h-display mt-5 text-[2.6rem] md:text-7xl">{d.news.lead}</h1>
        </div>
      </section>
      <section className="container-x py-16 md:py-24">
        {items.length === 0 ? (
          <p className="text-stone">{d.news.empty}</p>
        ) : (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <li key={n.slug}>
                <Link href={href(locale, "news", n.slug)} className="group block">
                  <Visual image={n.image} locale={locale} label={d.ui.illustrative} tone="noon" className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" />
                  <time dateTime={n.date} className="mt-5 block text-xs text-stone">
                    {formatDate(n.date, locale)}
                  </time>
                  <h2 className="h-display mt-2 text-2xl text-forest group-hover:text-moss">{n.title[locale]}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{n.excerpt[locale]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-moss">
                    {d.ui.readMore} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export function NewsDetailPage({ locale, d, item }: { locale: Locale; d: Dictionary; item: Announcement }) {
  return (
    <article>
      <section className="on-dark bg-forest text-ivory">
        <div className="container-x pb-14 pt-16 md:pb-20 md:pt-24">
          <Link href={href(locale, "news")} className="inline-flex items-center gap-3 text-sm text-ivory/75 hover:text-ivory">
            <Arrow className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {d.ui.backToNews}
          </Link>
          <time dateTime={item.date} className="mt-8 block text-sm text-gold-soft">
            {formatDate(item.date, locale)}
          </time>
          <h1 className="h-display mt-4 max-w-4xl text-4xl md:text-6xl">{item.title[locale]}</h1>
        </div>
      </section>
      {item.image && (
        <div className="container-x -mt-px">
          <Visual image={item.image} locale={locale} label={d.ui.illustrative} tone="noon" className="aspect-[16/7]" />
        </div>
      )}
      <div className="container-x py-14 md:py-20">
        <div className="prose-body max-w-3xl text-lg leading-relaxed text-anthracite">
          {item.body[locale].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
