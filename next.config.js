/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: './creds.json'
  },
  images: {
    domains: ['gateway.pinata.cloud']
  }
}

module.exports = nextConfig
