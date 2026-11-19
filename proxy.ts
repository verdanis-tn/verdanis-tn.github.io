import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["fr", "ar", "en"];

function preferredLocale(header: string | null) {
  if (!header) return "fr";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => LOCALES.includes(r.lang))?.lang ?? "fr";
}

/** Redirects locale-less URLs to /fr, /ar or /en (French by default). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (LOCALES.includes(first)) return NextResponse.next();

  const locale = preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "/" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
