/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // EXPORT_MODE=1 levert een volledig statische build op. Die gebruiken we om
  // een offline, deelbare voorvertoning van de site te bouwen.
  ...(process.env.EXPORT_MODE === "1" ? { output: "export" } : {}),
  images: {
    // Demo draait als statische export op Netlify; de ingebouwde image
    // optimizer is daar niet beschikbaar.
    unoptimized: true,
  },
};

export default nextConfig;
