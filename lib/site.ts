export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Flip to true (env) only after the verification report is signed off. */
  launchApproved: process.env.NEXT_PUBLIC_LAUNCH_APPROVED === "true",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  /**
   * Static hosting (GitHub Pages): the form posts to an external form service
   * (e.g. https://formspree.io/f/xxxxxx). Empty → the built-in /api/contact route.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  /** Set to "true" only if the form service accepts file uploads. */
  formAllowsFiles: process.env.NEXT_PUBLIC_FORM_ALLOWS_FILES === "true",
  /** Set by scripts/build-pages.mjs: no server, so no /api/contact. */
  staticExport: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true",
};
