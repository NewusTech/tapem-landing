/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["https://newus-bucket.s3.ap-southeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newus-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/*/**",
      },
    ],
  },
};

export default nextConfig;
