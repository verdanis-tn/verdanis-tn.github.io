export const locales = ["fr", "ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** A value translated in every locale. */
export type L<T = string> = Record<Locale, T>;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const dir = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** BCP-47 tags used for <html lang> and hreflang. */
export const htmlLang: L = { fr: "fr-TN", ar: "ar-TN", en: "en" };

/** Labels shown in the language selector: FR | العربية | EN */
export const localeLabel: L = { fr: "FR", ar: "العربية", en: "EN" };

export const ogLocale: L = { fr: "fr_FR", ar: "ar_TN", en: "en_GB" };

/** Pick the right language from a translated value, falling back to French. */
export function t<T>(value: Partial<L<T>> | undefined | null, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.fr;
}

/** Formats a date in the locale's convention (Arabic keeps Western digits, as in Tunisia). */
export function formatDate(iso: string, locale: Locale) {
  const tag = locale === "ar" ? "ar-TN-u-nu-latn" : htmlLang[locale];
  return new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}
