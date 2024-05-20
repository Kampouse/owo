/** @type {import('next').NextConfig} */

const { execSync } = require('child_process');
const commitHash = execSync('git rev-parse --short HEAD').toString()

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_APP_VERSION: `${process.env.NODE_ENV}.#${commitHash}`,
  }
};
module.exports = nextConfig;
