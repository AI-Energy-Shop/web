/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_PROTOCOL: process.env.BASE_PROTOCOL,
    BASE_URL_HOST: process.env.BASE_URL_HOST,
  },
  images: {
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
