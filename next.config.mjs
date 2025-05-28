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
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src/components', 'src/hooks'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

export default nextConfig;
