import { defineField, defineType } from "sanity";

/**
 * Trilingual building blocks. Every public text has a French, Arabic and
 * English version side by side, so nothing is published half-translated.
 */
const LANGS = [
  { id: "fr", title: "Français" },
  { id: "ar", title: "العربية" },
  { id: "en", title: "English" },
] as const;

export const localeString = defineType({
  name: "localeString",
  title: "Texte court (FR / AR / EN)",
  type: "object",
  fieldsets: [{ name: "t", title: "Traductions", options: { columns: 1 } }],
  fields: LANGS.map((l) =>
    defineField({
      name: l.id,
      title: l.title,
      type: "string",
      validation: (r) => r.required().error(`Traduction ${l.title} manquante`),
    }),
  ),
});

export const localeText = defineType({
  name: "localeText",
  title: "Texte (FR / AR / EN)",
  type: "object",
  fields: LANGS.map((l) =>
    defineField({
      name: l.id,
      title: l.title,
      type: "text",
      rows: 4,
      validation: (r) => r.required().error(`Traduction ${l.title} manquante`),
    }),
  ),
});

/** Paragraphs or bullet items, one entry per line, per language. */
export const localeList = defineType({
  name: "localeList",
  title: "Liste (FR / AR / EN)",
  type: "object",
  fields: LANGS.map((l) =>
    defineField({ name: l.id, title: l.title, type: "array", of: [{ type: "text", rows: 2 }] }),
  ),
});

export const pillar = defineType({
  name: "pillar",
  title: "Bloc titre + texte",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "text", title: "Texte", type: "localeText" }),
  ],
  preview: { select: { title: "title.fr", subtitle: "text.fr" } },
});

/**
 * Image with trilingual alt text and an explicit "illustrative" flag.
 * Illustrative images are captioned as such on the site.
 */
export const siteImage = defineType({
  name: "siteImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Texte alternatif (accessibilité)", type: "localeString" }),
    defineField({
      name: "illustrative",
      title: "Image d'illustration (pas une photo de nos chantiers)",
      description:
        "Cochez pour toute image libre de droits ou générée : le site affichera « Image d'illustration ». Décochez uniquement pour une photo authentique d'un chantier de l'entreprise.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "credit", title: "Crédit / source", type: "string" }),
  ],
});

export const toneField = defineField({
  name: "tone",
  title: "Ambiance colorimétrique",
  type: "string",
  options: {
    list: [
      { title: "Aube", value: "dawn" },
      { title: "Midi", value: "noon" },
      { title: "Crépuscule", value: "dusk" },
      { title: "Brume", value: "mist" },
      { title: "Doré", value: "gold" },
      { title: "Aucune", value: "none" },
    ],
  },
  initialValue: "none",
});
