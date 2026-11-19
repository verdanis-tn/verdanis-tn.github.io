import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "./locale";

const SERVICE_KEYS = [
  { title: "Entretien des espaces verts", value: "green-spaces" },
  { title: "Maintenance paysagère des infrastructures", value: "infrastructure-landscape" },
  { title: "Nettoyage et entretien des abords routiers", value: "roadside-cleaning" },
  { title: "Gestion de la végétation et débroussaillage", value: "vegetation-management" },
  { title: "Irrigation et expertise agronomique", value: "agronomy" },
];

const CATEGORIES = [
  { title: "Espaces verts", value: "green-spaces" },
  { title: "Abords routiers", value: "roadside" },
  { title: "Autoroutes", value: "highway" },
  { title: "Espaces publics", value: "public-space" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres & coordonnées",
  type: "document",
  groups: [
    { name: "brand", title: "Marque & accueil", default: true },
    { name: "contact", title: "Coordonnées publiques" },
    { name: "legal", title: "Informations légales" },
  ],
  fields: [
    defineField({ name: "brand", title: "Marque", type: "string", group: "brand", initialValue: "VERDANIS" }),
    defineField({ name: "descriptor", title: "Descripteur", type: "localeString", group: "brand" }),
    defineField({ name: "heroTitle", title: "Titre d'accueil", type: "localeString", group: "brand" }),
    defineField({ name: "heroText", title: "Texte d'accueil", type: "localeText", group: "brand" }),
    defineField({ name: "heroImage", title: "Image d'accueil", type: "siteImage", group: "brand" }),
    defineField({
      name: "email",
      title: "E-mail public",
      description: "Adresse professionnelle approuvée. Laisser vide pour ne rien afficher.",
      type: "string",
      group: "contact",
      validation: (r) => r.email(),
    }),
    defineField({ name: "phone", title: "Téléphone public", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Adresse", type: "localeString", group: "contact" }),
    defineField({
      name: "legalName",
      title: "Raison sociale officielle",
      description: "Telle qu'inscrite au Registre national des entreprises. Affichée en pied de page et dans les mentions légales.",
      type: "string",
      group: "legal",
    }),
    defineField({ name: "formerName", title: "Ancien nom", type: "string", group: "legal" }),
    defineField({ name: "registration", title: "Identifiant RNE", type: "string", group: "legal" }),
    defineField({ name: "taxId", title: "Matricule fiscal", type: "string", group: "legal" }),
    defineField({ name: "publicationDirector", title: "Directeur de la publication", type: "string", group: "legal" }),
    defineField({ name: "host", title: "Hébergeur (nom et adresse)", type: "string", group: "legal" }),
  ],
  preview: { prepare: () => ({ title: "Paramètres & coordonnées" }) },
});

export const companyProfile = defineType({
  name: "companyProfile",
  title: "Profil de l'entreprise",
  type: "document",
  groups: [
    { name: "about", title: "Présentation", default: true },
    { name: "leader", title: "Direction" },
    { name: "means", title: "Moyens" },
    { name: "commit", title: "Engagements" },
  ],
  fields: [
    defineField({ name: "intro", title: "Présentation", type: "localeText", group: "about" }),
    defineField({ name: "approach", title: "Approche", type: "localeText", group: "about" }),
    defineField({ name: "pillars", title: "Piliers de l'approche", type: "array", of: [{ type: "pillar" }], group: "about" }),
    defineField({ name: "sectors", title: "Secteurs clients", type: "array", of: [{ type: "pillar" }], group: "about" }),
    defineField({
      name: "territories",
      title: "Territoires d'intervention",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "territory",
          fields: [
            defineField({ name: "region", title: "Région", type: "localeString" }),
            defineField({ name: "places", title: "Lieux", type: "localeString" }),
          ],
          preview: { select: { title: "region.fr", subtitle: "places.fr" } },
        }),
      ],
    }),
    defineField({
      name: "milestones",
      title: "Repères",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            defineField({ name: "year", title: "Année", type: "string" }),
            defineField({ name: "text", title: "Texte", type: "localeText" }),
          ],
          preview: { select: { title: "year", subtitle: "text.fr" } },
        }),
      ],
    }),
    defineField({
      name: "leader",
      title: "Dirigeant",
      type: "object",
      group: "leader",
      fields: [
        defineField({ name: "name", title: "Nom", type: "string" }),
        defineField({ name: "role", title: "Fonction", type: "localeString" }),
        defineField({ name: "bio", title: "Biographie (paragraphes)", type: "localeList" }),
        defineField({ name: "education", title: "Formation", type: "localeList" }),
        defineField({ name: "photo", title: "Portrait", type: "siteImage" }),
      ],
    }),
    defineField({ name: "capabilities", title: "Moyens", type: "array", of: [{ type: "pillar" }], group: "means" }),
    defineField({ name: "method", title: "Méthode (étapes)", type: "array", of: [{ type: "pillar" }], group: "means" }),
    defineField({
      name: "equipment",
      title: "Matériel (liste vérifiée)",
      description: "Section masquée tant que la liste est vide. N'indiquer que du matériel effectivement disponible.",
      type: "localeList",
      group: "means",
    }),
    defineField({ name: "commitments", title: "Engagements", type: "array", of: [{ type: "pillar" }], group: "commit" }),
  ],
  preview: { prepare: () => ({ title: "Profil de l'entreprise" }) },
});

export const service = defineType({
  name: "service",
  title: "Expertise",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Identifiant", type: "string", options: { list: SERVICE_KEYS }, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Ordre d'affichage", type: "number" }),
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "summary", title: "Résumé", type: "localeText" }),
    defineField({ name: "itemsHeading", title: "Titre de la liste (facultatif)", type: "localeString" }),
    defineField({ name: "items", title: "Ce que comprend la prestation", type: "localeList" }),
    defineField({ name: "note", title: "Précision (facultatif)", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "siteImage" }),
    toneField,
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.fr", subtitle: "summary.fr", media: "image" } },
});

export const project = defineType({
  name: "project",
  title: "Réalisation",
  type: "document",
  groups: [
    { name: "public", title: "Contenu public", default: true },
    { name: "media", title: "Images" },
    { name: "internal", title: "Registre interne" },
  ],
  fields: [
    defineField({ name: "title", title: "Titre", type: "localeString", group: "public" }),
    defineField({
      name: "slug",
      title: "Adresse (slug)",
      type: "slug",
      group: "public",
      options: { source: "title.en", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Ordre d'affichage", type: "number", group: "public" }),
    defineField({ name: "featured", title: "Mise en avant sur l'accueil", type: "boolean", group: "public" }),
    defineField({ name: "category", title: "Catégorie éditoriale", type: "string", options: { list: CATEGORIES }, group: "public" }),
    defineField({
      name: "services",
      title: "Expertises mobilisées",
      type: "array",
      of: [{ type: "string" }],
      options: { list: SERVICE_KEYS },
      group: "public",
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      options: { list: [{ title: "En cours", value: "ongoing" }, { title: "Achevé", value: "completed" }], layout: "radio" },
      group: "public",
    }),
    defineField({ name: "summary", title: "Résumé", type: "localeText", group: "public" }),
    defineField({ name: "description", title: "Description (paragraphes)", type: "localeList", group: "public" }),
    defineField({ name: "scope", title: "Périmètre technique", type: "localeList", group: "public" }),
    defineField({ name: "period", title: "Période (texte affiché)", type: "localeString", group: "public" }),
    defineField({ name: "location", title: "Lieu vérifié", description: "Laisser vide si non confirmé.", type: "localeString", group: "public" }),
    defineField({
      name: "client",
      title: "Donneur d'ordre",
      description: "À renseigner UNIQUEMENT si sa publication est autorisée.",
      type: "localeString",
      group: "public",
    }),
    defineField({ name: "image", title: "Image principale", type: "siteImage", group: "media" }),
    defineField({ name: "gallery", title: "Galerie", type: "array", of: [{ type: "siteImage" }], group: "media" }),
    { ...toneField, group: "media" },
    defineField({
      name: "contracts",
      title: "Contrats regroupés (INTERNE — jamais publié)",
      description:
        "Registre interne des marchés regroupés sous cette réalisation. N'est jamais affiché sur le site. Ne pas y saisir de montants.",
      type: "array",
      group: "internal",
      of: [
        defineArrayMember({
          type: "object",
          name: "contract",
          fields: [
            defineField({ name: "label", title: "Intitulé", type: "text", rows: 2 }),
            defineField({ name: "period", title: "Période", type: "string" }),
            defineField({
              name: "verification",
              title: "Vérification",
              type: "string",
              options: {
                list: [
                  { title: "Déclaré (non vérifié)", value: "declared" },
                  { title: "Documenté (contrat / attestation)", value: "documented" },
                  { title: "Publication autorisée", value: "authorized" },
                ],
              },
              initialValue: "declared",
            }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "period", subtitle: "label" } },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.fr", subtitle: "period.fr", media: "image" } },
});

export const announcement = defineType({
  name: "announcement",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({
      name: "slug",
      title: "Adresse (slug)",
      type: "slug",
      options: { source: "title.en", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Chapeau", type: "localeText" }),
    defineField({ name: "body", title: "Texte (paragraphes)", type: "localeList" }),
    defineField({ name: "image", title: "Image", type: "siteImage" }),
  ],
  orderings: [{ title: "Date", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title.fr", subtitle: "date", media: "image" } },
});
