/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const repoName = "Munich-market-analysis-";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
