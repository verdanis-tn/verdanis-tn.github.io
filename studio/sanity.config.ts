import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { localeString, localeText, localeList, pillar, siteImage } from "./schemas/locale";
import { siteSettings, companyProfile, service, project, announcement } from "./schemas/documents";

const SINGLETONS = ["siteSettings", "companyProfile"];

/** Admin menu, in French, organised the way the company thinks about its site. */
const structure: StructureResolver = (S) =>
  S.list()
    .title("VERDANIS — Administration")
    .items([
      S.listItem()
        .title("Réalisations")
        .child(S.documentTypeList("project").title("Réalisations").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem()
        .title("Expertises")
        .child(S.documentTypeList("service").title("Expertises").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem()
        .title("Actualités")
        .child(S.documentTypeList("announcement").title("Actualités").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.divider(),
      S.listItem()
        .title("Profil de l'entreprise")
        .child(S.document().schemaType("companyProfile").documentId("companyProfile")),
      S.listItem()
        .title("Paramètres & coordonnées")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);

export default defineConfig({
  name: "verdanis",
  title: "VERDANIS — Administration",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: [localeString, localeText, localeList, pillar, siteImage, siteSettings, companyProfile, service, project, announcement],
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // Singletons: no duplicate / delete.
    actions: (input, ctx) =>
      SINGLETONS.includes(ctx.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
});
