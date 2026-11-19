/**
 * VERDANIS brand mark (provisional): a leaf whose central vein continues into a
 * horizon line — vegetation rooted in infrastructure.
 */
export function BrandSymbol({ className = "h-9 w-9", inverted = false }: { className?: string; inverted?: boolean }) {
  const bg = inverted ? "#F6F5F0" : "#17372F";
  const line = inverted ? "#17372F" : "#F6F5F0";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="3" fill={bg} />
      <path d="M24 8.5c8.6 5.4 10.2 16.6 0 26-10.2-9.4-8.6-20.6 0-26Z" fill="none" stroke="#B5A078" strokeWidth="2" />
      <path d="M24 13v23.5" stroke="#B5A078" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 22.5l-4.2-3.4M24 28l4.2-3.4" stroke="#B5A078" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 39h28" stroke={line} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({
  descriptor,
  tone = "dark",
  compact = false,
}: {
  descriptor?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const text = tone === "light" ? "text-ivory" : "text-forest";
  const sub = tone === "light" ? "text-gold-soft" : "text-moss";
  return (
    <span className="flex items-center gap-3" dir="ltr">
      <BrandSymbol inverted={tone === "light"} />
      <span className="flex flex-col leading-none">
        <span className={`font-[family-name:var(--font-fraunces)] text-[1.35rem] tracking-[0.28em] ${text}`}>
          VERDANIS
        </span>
        {!compact && descriptor && (
          <span className={`mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${sub}`}>{descriptor}</span>
        )}
      </span>
    </span>
  );
}
