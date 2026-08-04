/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // EXPORT_MODE=1 levert een volledig statische build op (map `out/`). Dat is
  // wat GitHub Pages serveert; de gewone build blijft ongewijzigd.
  ...(process.env.EXPORT_MODE === "1" ? { output: "export" } : {}),

  // GitHub Pages serveert een projectsite onder /<repo>/. Zonder deze prefix
  // wijzen alle links en assets naar de verkeerde map.
  ...(process.env.BASE_PATH ? { basePath: process.env.BASE_PATH } : {}),

  images: {
    // De ingebouwde image optimizer bestaat niet op een statische host.
    unoptimized: true,
  },

  // Zonder trailing slash schrijft de export /nl.html in plaats van /nl/index.html;
  // GitHub Pages vindt die eerste variant niet bij een schuine streep op het eind.
  ...(process.env.EXPORT_MODE === "1" ? { trailingSlash: true } : {}),
};

export default nextConfig;
