import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getContent } from "@/lib/content";
import { href, navKeys } from "@/lib/routes";
import { Wordmark } from "./Logo";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const { settings } = await getContent();
  const year = new Date().getFullYear();
  const holder = settings.legalName ?? settings.brand;

  return (
    <footer className="on-dark bg-forest-deep text-ivory/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark tone="light" descriptor={settings.descriptor[locale]} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{d.footer.tagline}</p>
          {settings.formerName && (
            <p className="mt-4 text-xs text-gold-soft/80">
              {d.ui.formerly} <span dir="ltr">{settings.formerName}</span>
            </p>
          )}
        </div>

        <div className="md:col-span-3">
          <p className="kicker">{d.footer.explore}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navKeys.slice(1).map((key) => (
              <li key={key}>
                <Link href={href(locale, key)} className="link-underline hover:text-ivory">
                  {d.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="kicker">{d.footer.company}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {(["news", "legal", "privacy"] as const).map((key) => (
              <li key={key}>
                <Link href={href(locale, key)} className="link-underline hover:text-ivory">
                  {d.nav[key]}
                </Link>
              </li>
            ))}
            {settings.email && (
              <li className="pt-3">
                <a href={`mailto:${settings.email}`} className="link-underline hover:text-ivory" dir="ltr">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-ivory" dir="ltr">
                  {settings.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.72rem] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} <span dir="ltr">{holder}</span>. {d.footer.rights}
          </p>
          <p className="max-w-xl md:text-end">{d.footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
