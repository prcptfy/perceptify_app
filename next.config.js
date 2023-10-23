/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lwtvdomrgtirwrwobwus.supabase.co"]
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
