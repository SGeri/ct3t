/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));
console.log(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  process.env.CLERK_SECRET_KEY,
);

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@packages/api", "@packages/db"],
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default config;
