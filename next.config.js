/** @type {import('next').NextConfig} */
const { locales, defaultLocale } = require('./i18n')
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['karmakametstudio.com','firebasestorage.googleapis.com','s3.ap-southeast-1.amazonaws.com'],
  },
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    localeDetection: false,
  },
}

module.exports = nextConfig
