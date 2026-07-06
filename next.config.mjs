/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trust the loopback IP during local development so HMR and Server Actions
  // work when the app is opened via 127.0.0.1 (dev-only; ignored in production).
  allowedDevOrigins: ["127.0.0.1"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
