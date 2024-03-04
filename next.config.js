/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'experimental-serverless-trace',
  basePath: '/app',
  // Add the export configuration
  exportPathMap: () => ({
    '/': { page: '/' },
    // Add other routes as needed
  }),
};

module.exports = nextConfig;
