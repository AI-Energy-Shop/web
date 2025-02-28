/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_PROTOCOL: process.env.BASE_PROTOCOL,
    BASE_URL_HOST: process.env.BASE_URL_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.DO_SPACES_PROTOCOL,
        hostname: process.env.DO_SPACES_HOST,
        pathname: process.env.DO_SPACES_PATH,
        port: '',
      },
    ],
  },
  transpilePackages: ['lucide-react'], // add this
  reactStrictMode: false,
};

export default nextConfig;
