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
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'hammerhead-app-aauqg.ondigitalocean.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aienergyshop-strapi-uploads.syd1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['lucide-react'], // add this
  reactStrictMode: true,
  // swcMinify: true,
  // compiler: {
  //   // Enables the styled-components SWC transform
  //   styledComponents: true, //removes warning from styled-components
  // },
};

export default nextConfig;
