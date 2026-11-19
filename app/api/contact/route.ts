import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const MIN_FILL_MS = 3000;

/** Allowed attachments, checked by magic bytes — not by the browser-supplied type. */
const SIGNATURES: { ext: string; mime: string; bytes: number[] }[] = [
  { ext: "pdf", mime: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] },
  { ext: "jpg", mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { ext: "png", mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  {
    ext: "docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    bytes: [0x50, 0x4b, 0x03, 0x04],
  },
];

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  organization: z.string().trim().max(160).optional().default(""),
  email: z.email().max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+0-9 ().-]*$/)
    .optional()
    .default(""),
  service: z.string().trim().min(1).max(120),
  location: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("yes"),
  locale: z.enum(["fr", "ar", "en"]).default("fr"),
});

// Best-effort in-memory rate limit (per server instance): 5 requests / 10 min / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const fail = (error: string, status: number, fields?: string[]) =>
  NextResponse.json({ ok: false, error, fields }, { status });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function verifyTurnstile(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // optional layer
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  return !!json.success;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("rate", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("validation", 400);
  }

  // Bots: honeypot filled or form submitted implausibly fast → pretend success.
  const elapsed = Number(form.get("elapsed") ?? 0);
  if (String(form.get("_gotcha") ?? "") !== "" || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(form.get("cf-turnstile-response") as string | null, ip))) {
    return fail("validation", 400, ["turnstile"]);
  }

  const parsed = schema.safeParse(Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string")));
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    return fail("validation", 400, fields);
  }
  const data = parsed.data;

  // Attachment: size, then real file signature. Never written to disk.
  let attachment: { filename: string; content: Buffer; contentType: string } | undefined;
  const file = form.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) return fail("file", 400, ["attachment"]);
    const buf = Buffer.from(await file.arrayBuffer());
    const sig = SIGNATURES.find((s) => s.bytes.every((b, i) => buf[i] === b));
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const extOk = sig && (sig.ext === ext || (sig.ext === "jpg" && ext === "jpeg"));
    if (!sig || !extOk) return fail("file", 400, ["attachment"]);
    const base = file.name
      .replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[^\w-]+/g, "_")
      .slice(0, 60) || "piece-jointe";
    attachment = { filename: `${base}.${sig.ext}`, content: buf, contentType: sig.mime };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.warn("[contact] SMTP / CONTACT_TO_EMAIL not configured — enquiry not sent.");
    return fail("unavailable", 503);
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Nom", data.name],
    ["Organisme", data.organization],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Prestation", data.service],
    ["Lieu du projet", data.location],
    ["Langue du formulaire", data.locale.toUpperCase()],
  ];
  const text = rows.map(([k, v]) => `${k} : ${v || "—"}`).join("\n") + `\n\n${data.message}`;
  const html =
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="color:#5e6660">${esc(k)}</td><td><strong>${esc(v || "—")}</strong></td></tr>`).join("") +
    `</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>`;

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `[Site web] Demande — ${data.service} — ${data.name}`.slice(0, 180),
      text,
      html,
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return fail("generic", 502);
  }

  return NextResponse.json({ ok: true });
}
