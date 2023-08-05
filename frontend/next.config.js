/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com","picsum.photos"], // Add your domain here
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
