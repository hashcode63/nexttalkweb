/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'i3.ytimg.com',
      'i.pravatar.cc'
    ]
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  }
};

module.exports = nextConfig;
