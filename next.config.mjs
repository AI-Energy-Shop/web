/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  env: {
    BASE_PROTOCOL: process.env.BASE_PROTOCOL,
    BASE_URL_HOST: process.env.BASE_URL_HOST,
    DO_SPACES_HOST: process.env.DO_SPACES_HOST,
    DO_SPACES_PATH: process.env.DO_SPACES_PATH,
    DO_SPACES_PROTOCOL: process.env.DO_SPACES_PROTOCOL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MACSHIP_API_KEY: process.env.MACSHIP_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.DO_SPACES_HOST,
        pathname: process.env.DO_SPACES_PATH,
        port: '',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src/components', 'src/hooks'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
