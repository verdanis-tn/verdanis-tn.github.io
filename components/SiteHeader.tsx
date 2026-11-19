"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, localeLabel, htmlLang, type Locale } from "@/lib/i18n";
import { switchLocalePath, type PageKey } from "@/lib/routes";
import { Wordmark } from "./Logo";

type NavItem = { key: PageKey; href: string; label: string };

export function SiteHeader({
  locale,
  nav,
  descriptor,
  labels,
  contactHref,
}: {
  locale: Locale;
  nav: NavItem[];
  descriptor: string;
  labels: { menu: string; close: string; language: string; cta: string };
  contactHref: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const norm = (p: string) => p.replace(/\/+$/, "");
  const isActive = (item: NavItem) => {
    const here = norm(pathname);
    const target = norm(item.href);
    return item.key === "home" ? here === target : here === target || here.startsWith(target + "/");
  };

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <nav aria-label={labels.language} className={`flex items-center text-[0.8rem] font-semibold ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-2 h-3 w-px bg-current opacity-25" aria-hidden="true" />}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={htmlLang[l]}
            lang={htmlLang[l]}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale ? "text-forest underline decoration-gold decoration-2 underline-offset-[6px]" : "text-stone hover:text-forest"
            }
          >
            {localeLabel[l]}
          </Link>
        </span>
      ))}
    </nav>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-forest/10 bg-ivory/95 backdrop-blur" : "border-transparent bg-ivory"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} aria-label="VERDANIS" className="shrink-0">
          <Wordmark descriptor={descriptor} />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[0.86rem] font-medium">
            {nav.slice(1).map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={`link-underline py-1 ${isActive(item) ? "text-forest" : "text-anthracite/80 hover:text-forest"} ${
                    isActive(item) ? "!bg-[length:100%_1px]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <LangSwitch />
        </div>

        <button
          type="button"
          className="flex h-11 items-center gap-3 text-sm font-semibold text-forest xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? labels.close : labels.menu}</span>
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span className={`absolute inset-x-0 top-0 h-px bg-current transition ${open ? "top-1.5 rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition ${open ? "bottom-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu — mirrors automatically in RTL through logical properties */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory xl:hidden"
      >
        <div className="container-x flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.key} className="border-b border-forest/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${
                    isActive(item) ? "text-forest" : "text-anthracite"
                  }`}
                >
                  {item.label}
                  {isActive(item) && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-6 pt-10">
            <LangSwitch className="text-base" />
            <Link href={contactHref} className="btn btn-forest justify-center">
              {labels.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
