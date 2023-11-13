/** @type {import('next').NextConfig} */
const nextConfig = {
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
