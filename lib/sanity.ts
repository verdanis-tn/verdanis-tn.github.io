import { createClient, type SanityClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2025-01-01";

/**
 * Read-only client for the public site. `perspective: "published"` means drafts
 * saved in the Studio are never visible here until they are published —
 * this is the review-before-publication workflow.
 */
export const sanity: SanityClient | null = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
