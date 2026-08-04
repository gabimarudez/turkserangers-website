/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Demo draait als statische export op Netlify; de ingebouwde image
    // optimizer is daar niet beschikbaar.
    unoptimized: true,
  },
};

export default nextConfig;
