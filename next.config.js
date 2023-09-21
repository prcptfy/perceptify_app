/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/home/overview',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
