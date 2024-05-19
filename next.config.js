/** @type {import('next').NextConfig} */

const path = require('path')

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

  const nextConfig = {
    reactStrictMode: false,
    generateBuildId: async () => {
      // This could be anything, using the latest git hash
      return process.env.GIT_HASH ?? 'dev'
    },
  };
module.exports = nextConfig;
