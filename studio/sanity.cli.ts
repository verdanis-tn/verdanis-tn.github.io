import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Studio URL once deployed: https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST || undefined,
});
