// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // Make sure this is correct
      },
    ];
  },
};


// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

