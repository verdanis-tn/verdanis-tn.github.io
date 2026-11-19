import Image from "next/image";
import Link from "next/link";
import type { ImageRef, Project, Tone, Category } from "@/lib/types";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import type { Dictionary } from "@/lib/dictionary";

/** Arrow that points "forward" in both reading directions. */
export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`${className} rtl:-scale-x-100`} aria-hidden="true" focusable="false">
      <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Image block. Illustrative images always carry a visible caption so they are
 * never mistaken for photographs of the company's own work.
 */
export function Visual({
  image,
  locale,
  label,
  tone = "none",
  className = "",
  sizes = "100vw",
  priority = false,
  overlay = false,
  zoom = false,
}: {
  image?: ImageRef;
  locale: Locale;
  label: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-moss ${className}`}>
      {image ? (
        <Image
          src={image.src}
          alt={t(image.alt, locale) ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover tone-${tone} ${zoom ? "animate-slowzoom" : ""}`}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#34594a,#17372f_60%,#0f2620)]" />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/55 to-forest-deep/15" />
      )}
      {image?.illustrative && (
        <span className="absolute bottom-3 end-3 z-10 bg-forest-deep/60 px-2 py-0.5 text-[0.62rem] tracking-wide text-ivory/85 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  image,
  tone,
  locale,
  label,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  image?: ImageRef;
  tone?: Tone;
  locale: Locale;
  label: string;
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[min(52vh,36rem)] items-end overflow-hidden text-ivory md:min-h-[min(60vh,40rem)]">
      <Visual image={image} locale={locale} label={label} tone={tone} overlay priority zoom className="!absolute inset-0 -z-10" />
      <div className="container-x pb-14 pt-32 md:pb-20">
        {kicker && <p className="kicker animate-rise">{kicker}</p>}
        <h1 className="h-display animate-rise delay-1 mt-5 max-w-4xl text-[2.6rem] md:text-7xl">{title}</h1>
        {lead && <p className="animate-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">{lead}</p>}
      </div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  text,
  className = "",
}: {
  kicker: string;
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="kicker">{kicker}</p>
      {title && <h2 className="h-display mt-5 text-4xl text-forest md:text-5xl">{title}</h2>}
      {text && <p className="mt-6 text-lg leading-relaxed text-stone">{text}</p>}
    </div>
  );
}

export function StatusBadge({ status, d }: { status: Project["status"]; d: Dictionary }) {
  const ongoing = status === "ongoing";
  return (
    <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] rtl:tracking-normal">
      <span className={`h-1.5 w-1.5 rounded-full ${ongoing ? "bg-gold" : "bg-ivory/70"}`} aria-hidden="true" />
      {ongoing ? d.project.ongoing : d.project.completed}
    </span>
  );
}

/** Large cinematic portfolio card. */
export function ProjectCard({
  project,
  locale,
  d,
  category,
  size = "md",
}: {
  project: Project;
  locale: Locale;
  d: Dictionary;
  category?: Category;
  size?: "lg" | "md";
}) {
  return (
    <Link
      href={href(locale, "projects", project.slug)}
      className={`on-dark group relative isolate flex h-full flex-col justify-end overflow-hidden text-ivory ${
        size === "lg" ? "min-h-[30rem] md:min-h-[38rem]" : "min-h-[26rem]"
      }`}
    >
      <Visual
        image={project.image}
        locale={locale}
        label={d.ui.illustrative}
        tone={project.tone}
        overlay
        sizes={size === "lg" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="!absolute inset-0 -z-10 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
      />
      <div className="p-7 md:p-9">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-ivory/80">
          {category && (
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-soft rtl:tracking-normal">
              {category.label[locale]}
            </span>
          )}
          <StatusBadge status={project.status} d={d} />
        </div>
        <h3 className={`h-display mt-4 ${size === "lg" ? "text-3xl md:text-5xl" : "text-3xl"}`}>{project.title[locale]}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/80 md:text-base">{project.summary[locale]}</p>
        <p className="mt-5 text-xs text-ivory/60">{project.period[locale]}</p>
        <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-gold-soft">
          {d.ui.viewProject}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function CtaBand({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="on-dark bg-forest text-ivory">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-2xl">
          <h2 className="h-display text-3xl md:text-5xl">{d.home.ctaTitle}</h2>
          <p className="mt-4 text-ivory/75">{d.home.ctaText}</p>
        </div>
        <Link href={href(locale, "contact")} className="btn btn-gold shrink-0">
          {d.ui.contactUs}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
