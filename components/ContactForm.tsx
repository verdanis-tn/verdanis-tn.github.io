"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";
const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.docx";

export function ContactForm({
  locale,
  d,
  services,
  privacyHref,
  turnstileSiteKey,
  endpoint,
  allowFiles = true,
  unavailable = false,
}: {
  locale: Locale;
  d: Dictionary;
  services: { key: string; label: string }[];
  privacyHref: string;
  turnstileSiteKey?: string;
  /** External form service URL (static hosting). Defaults to the built-in API route. */
  endpoint?: string;
  allowFiles?: boolean;
  /** Static build without a form service configured. */
  unavailable?: boolean;
}) {
  const f = d.form;
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("elapsed", String(Date.now() - startedAt.current));
    data.set("locale", locale);

    // Client-side checks (the server re-validates everything).
    const bad: string[] = [];
    for (const name of ["name", "email", "service", "message"]) {
      if (!String(data.get(name) ?? "").trim()) bad.push(name);
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push("email");
    if (!data.get("consent")) bad.push("consent");
    const file = data.get("attachment");
    if (file instanceof File && file.size > 0 && file.size > MAX_BYTES) {
      setInvalid(["attachment"]);
      setStatus("error");
      setMessage(f.errors.file);
      return;
    }
    if (file instanceof File && file.size === 0) data.delete("attachment");
    if (bad.length) {
      setInvalid(bad);
      setStatus("error");
      setMessage(f.errors.validation);
      return;
    }

    setInvalid([]);
    if (unavailable) {
      setStatus("error");
      setMessage(f.errors.unavailable);
      return;
    }
    setStatus("sending");
    if (endpoint) {
      // Static hosting: no server-side timing check, so drop obvious bots here.
      if (String(data.get("_gotcha") ?? "") !== "" || Date.now() - startedAt.current < 3000) {
        setStatus("success");
        setMessage(f.success);
        return;
      }
      data.set("_subject", `[Site web] ${String(data.get("service"))} — ${String(data.get("name"))}`);
      data.set("_replyto", String(data.get("email")));
    }
    try {
      const res = await fetch(endpoint || "/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (res.ok && (json.ok || endpoint)) {
        setStatus("success");
        setMessage(f.success);
        formRef.current?.reset();
        return;
      }
      setStatus("error");
      if (json.fields) setInvalid(json.fields);
      const map: Record<string, string> = {
        validation: f.errors.validation,
        file: f.errors.file,
        rate: f.errors.rate,
        unavailable: f.errors.unavailable,
      };
      setMessage(map[json.error ?? ""] ?? f.errors.generic);
    } catch {
      setStatus("error");
      setMessage(f.errors.generic);
    }
  }

  const err = (name: string) => invalid.includes(name);
  const Label = ({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) => (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-anthracite">
      {children}
      {required && (
        <span className="text-gold" aria-hidden="true">
          {" "}
          *
        </span>
      )}
      {required && <span className="sr-only"> ({f.required})</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2" encType="multipart/form-data">
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Website</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Label htmlFor="name" required>{f.name}</Label>
        <input id="name" name="name" required maxLength={120} autoComplete="name" className="field" aria-invalid={err("name")} />
      </div>
      <div>
        <Label htmlFor="organization">{f.organization}</Label>
        <input id="organization" name="organization" maxLength={160} autoComplete="organization" className="field" />
      </div>
      <div>
        <Label htmlFor="email" required>{f.email}</Label>
        <input id="email" name="email" type="email" required maxLength={160} autoComplete="email" dir="ltr" className="field rtl:text-end" aria-invalid={err("email")} />
      </div>
      <div>
        <Label htmlFor="phone">{f.phone}</Label>
        <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" dir="ltr" className="field rtl:text-end" aria-invalid={err("phone")} />
      </div>
      <div>
        <Label htmlFor="service" required>{f.service}</Label>
        <select id="service" name="service" required defaultValue="" className="field" aria-invalid={err("service")}>
          <option value="" disabled>
            {f.servicePlaceholder}
          </option>
          {/* The label is sent, so the e-mail is readable without a lookup table. */}
          {services.map((s) => (
            <option key={s.key} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value={f.otherService}>{f.otherService}</option>
        </select>
      </div>
      <div>
        <Label htmlFor="location">{f.location}</Label>
        <input id="location" name="location" maxLength={160} className="field" />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message" required>{f.message}</Label>
        <textarea id="message" name="message" required rows={6} maxLength={5000} className="field resize-y" aria-invalid={err("message")} />
      </div>
      {allowFiles && (
      <div className="sm:col-span-2">
        <Label htmlFor="attachment">{f.attachment}</Label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept={ACCEPT}
          aria-describedby="attachment-hint"
          aria-invalid={err("attachment")}
          className="block w-full text-sm text-stone file:me-4 file:border-0 file:bg-forest file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-ivory hover:file:bg-moss"
        />
        <p id="attachment-hint" className="mt-2 text-xs text-stone">
          {f.attachmentHint}
        </p>
      </div>
      )}

      {turnstileSiteKey && (
        <div className="sm:col-span-2">
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language={locale} />
        </div>
      )}

      <div className="sm:col-span-2">
        <label className={`flex gap-3 text-sm leading-relaxed ${err("consent") ? "text-[#a4423a]" : "text-stone"}`}>
          <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-forest" aria-invalid={err("consent")} />
          <span>
            {f.consent}{" "}
            <Link href={privacyHref} className="text-moss underline underline-offset-4">
              {f.privacyLink}
            </Link>
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="btn btn-forest justify-center disabled:opacity-60">
          {status === "sending" ? f.sending : f.submit}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === "success" ? "text-moss" : status === "error" ? "text-[#a4423a]" : ""}`}
        >
          {status === "success" || status === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
