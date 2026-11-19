/**
 * One-off import of the seed content (content/*.ts) into Sanity.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_WRITE_TOKEN=yyy npm run seed
 *
 * Idempotent: documents use fixed IDs and are created-or-replaced, so running
 * it again overwrites CMS edits — use it only to initialise a fresh dataset.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { projects } from "../content/projects";
import { services } from "../content/services";
import { settings, company, announcements } from "../content/company";
import type { ImageRef } from "../lib/types";

// Load .env.local if present (tsx does not do it for us).
for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN first.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const assetCache = new Map<string, string>();
async function image(ref?: ImageRef) {
  if (!ref) return undefined;
  let id = assetCache.get(ref.src);
  if (!id) {
    const file = join("public", ref.src);
    const asset = await client.assets.upload("image", readFileSync(file), { filename: basename(file) });
    id = asset._id;
    assetCache.set(ref.src, id);
    console.log("  uploaded", ref.src);
  }
  return {
    _type: "siteImage",
    asset: { _type: "reference", _ref: id },
    alt: ref.alt,
    illustrative: ref.illustrative,
    credit: ref.credit,
  };
}

/** Sanity requires a unique _key on every object inside an array. */
function withKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v, i) =>
      v && typeof v === "object" && !Array.isArray(v) ? { _key: `k${i}`, ...withKeys(v) } : withKeys(v),
    ) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v)])) as T;
  }
  return value;
}

async function main() {
  const tx = client.transaction();

  const { heroImage, ...s } = settings;
  tx.createOrReplace(withKeys({ _id: "siteSettings", _type: "siteSettings", ...s, heroImage: await image(heroImage) }));

  const { leader, ...comp } = company;
  tx.createOrReplace(
    withKeys({
      _id: "companyProfile",
      _type: "companyProfile",
      ...comp,
      leader: leader && { ...leader, photo: await image(leader.photo) },
    }),
  );

  for (const sv of services) {
    tx.createOrReplace(withKeys({ _id: `service-${sv.key}`, _type: "service", ...sv, image: await image(sv.image) }));
  }

  for (const p of projects) {
    const { slug, image: img, gallery, contracts, ...rest } = p;
    tx.createOrReplace(
      withKeys({
        _id: `project-${slug}`,
        _type: "project",
        ...rest,
        slug: { _type: "slug", current: slug },
        image: await image(img),
        gallery: await Promise.all(gallery.map((g) => image(g))),
        contracts: contracts.map(({ id: _id, ...c }) => c),
      }),
    );
  }

  for (const n of announcements) {
    const { slug, image: img, ...rest } = n;
    tx.createOrReplace(
      withKeys({ _id: `announcement-${slug}`, _type: "announcement", ...rest, slug: { _type: "slug", current: slug }, image: await image(img) }),
    );
  }

  await tx.commit();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
