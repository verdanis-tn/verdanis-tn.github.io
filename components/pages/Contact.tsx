import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent } from "@/lib/types";
import { href } from "@/lib/routes";
import { site } from "@/lib/site";
import { ContactForm } from "../ContactForm";

export function ContactPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  const { settings } = c;
  const details = [
    settings.email && { label: d.contact.email, value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    settings.phone && { label: d.contact.phone, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, ltr: true },
    settings.address && { label: d.contact.address, value: settings.address[locale], ltr: false },
  ].filter(Boolean) as { label: string; value: string; href?: string; ltr: boolean }[];

  return (
    <>
      <section className="on-dark bg-forest text-ivory">
        <div className="container-x pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="kicker animate-rise">{d.contact.title}</p>
          <h1 className="h-display animate-rise delay-1 mt-5 max-w-4xl text-[2.6rem] md:text-7xl">{d.contact.lead}</h1>
        </div>
      </section>

      <section className="container-x grid gap-16 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="h-display text-3xl text-forest">{d.contact.formTitle}</h2>
          <div className="mt-8">
            <ContactForm
              locale={locale}
              d={d}
              services={c.services.map((s) => ({ key: s.key, label: s.title[locale] }))}
              privacyHref={href(locale, "privacy")}
              turnstileSiteKey={site.formEndpoint ? undefined : site.turnstileSiteKey || undefined}
              endpoint={site.formEndpoint || undefined}
              allowFiles={site.formEndpoint ? site.formAllowsFiles : !site.staticExport}
              unavailable={site.staticExport && !site.formEndpoint}
            />
          </div>
        </div>

        {details.length > 0 && (
          <aside className="lg:col-span-3 lg:col-start-10">
            <p className="kicker">{d.contact.detailsKicker}</p>
            <dl className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
              {details.map((item) => (
                <div key={item.label} className="py-5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-moss rtl:tracking-normal">{item.label}</dt>
                  <dd className="mt-1.5 text-forest" dir={item.ltr ? "ltr" : undefined}>
                    {item.href ? (
                      <a href={item.href} className="link-underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </section>
    </>
  );
}
