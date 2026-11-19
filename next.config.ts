import type { NextConfig } from "next";

/**
 * Two deployment modes:
 *  - STATIC_EXPORT=true  → plain HTML in out/, for GitHub Pages (npm run build:pages)
 *  - otherwise           → Node server (Vercel or similar), with the /api/contact route
 */
const staticExport = process.env.STATIC_EXPORT === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimiser: images are pre-compressed in the repo.
    unoptimized: staticExport,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  ...(staticExport
    ? { output: "export" as const }
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
