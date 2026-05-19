import { withSerwist } from "@serwist/turbopack";

/** @type {import('next').NextConfig} */
const nextConfig = withSerwist({
  allowedDevOrigins: ['192.168.86.107'],
  async redirects() {
    return [
      // Landing lives in a separate project — until it ships, send the
      // root URL to the app. Use 307 (temporary) so when the real
      // landing returns at "/", browsers won't have a 308 cached.
      { source: '/', destination: '/library', permanent: false },
    ];
  },
});

export default nextConfig;
