import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/modules/cores/i18n/src/services/request.ts",
);

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
