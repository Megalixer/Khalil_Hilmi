/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  allowedDevOrigins: ['192.168.12.252'],
};

module.exports = nextConfig;
