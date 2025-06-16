/** @type {import('next').NextConfig} */
const nextConfig = {   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Your backend port
   pathname: '/uploads/**',
      },
      // Add production domain when ready
      {
        protocol: 'https',
        hostname: 'your-production-domain.com',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;
// next.config.js
