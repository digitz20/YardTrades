import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Allow images from any HTTPS source - Be cautious with this in production
      // Consider restricting to specific domains if possible
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
