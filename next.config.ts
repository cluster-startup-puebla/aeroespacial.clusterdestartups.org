import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/modules/cores/i18n/src/services/request.ts",
);

const isDevServer = process.argv.includes("dev");

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // `next dev` and `next start` cannot share a folder. Dev restarts wipe `.next`
  // and production then 500s on the CSS chunk.
  distDir: isDevServer ? ".next-dev" : ".next",
  // Dev blocks CSS and HMR unless the host matches localhost.
  allowedDevOrigins: ["127.0.0.1", "192.168.68.101"],
};

export default withNextIntl(nextConfig);
