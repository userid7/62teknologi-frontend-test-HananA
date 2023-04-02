/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/list_business",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
