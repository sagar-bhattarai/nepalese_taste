/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  //   images: {
  //   domains: ["res.cloudinary.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
