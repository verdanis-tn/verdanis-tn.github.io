"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : "fr";
  const d = getDictionary(locale);
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="kicker">404</p>
      <h1 className="h-display mt-5 text-5xl text-forest md:text-6xl">{d.notFound.title}</h1>
      <p className="mt-5 text-lg text-stone">{d.notFound.text}</p>
      <Link href={`/${locale}`} className="btn btn-forest mt-10">
        {d.notFound.back}
      </Link>
    </section>
  );
}
