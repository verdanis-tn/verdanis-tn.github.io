import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { dir, htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getContent } from "@/lib/content";
import { href, navKeys } from "@/lib/routes";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#17372F" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: "/brand/symbol.svg" },
  // Until the content verification report is signed off, nothing is indexed.
  robots: site.launchApproved ? undefined : { index: false, follow: false },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const { settings } = await getContent();
  const nav = navKeys.map((key) => ({ key, href: href(locale, key), label: d.nav[key] }));

  return (
    <html
      lang={htmlLang[locale]}
      dir={dir(locale)}
      className={`${fraunces.variable} ${manrope.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-deep"
        >
          {d.ui.skip}
        </a>
        {!site.launchApproved && (
          <div className="bg-anthracite py-1.5 text-center text-[0.7rem] tracking-wide text-gold-soft">
            {d.ui.preview}
          </div>
        )}
        <SiteHeader
          locale={locale}
          nav={nav}
          descriptor={settings.descriptor[locale]}
          labels={{ menu: d.ui.menu, close: d.ui.close, language: d.ui.language, cta: d.ui.contactUs }}
          contactHref={href(locale, "contact")}
        />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
