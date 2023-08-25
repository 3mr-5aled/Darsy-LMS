/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: false,
  scope: "/",
  sw: "service-worker.js",
  // fallback: {
  //   document: "/fallback",
  // },
  //...
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "picsum.photos", "s3.amazonaws.com"], // Add your domain here
    minimumCacheTTL: 60,
  },
}

module.exports = withPWA(nextConfig)
