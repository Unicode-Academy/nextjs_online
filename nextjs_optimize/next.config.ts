import type { NextConfig } from "next";
const getOptionFromApi = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/8`);
  const data = await response.json();
  return data;
};
const NextConfig = async () => {
  const options = await getOptionFromApi();
  if (!options.completed) {
    return {
      reactStrictMode: false,
    };
  }
  const nextConfig: NextConfig = {
    /* config options here */
    images: {
      remotePatterns: [
        {
          hostname: "cdnphoto.dantri.com.vn",
        },
        {
          hostname: "static-images.vnncdn.net",
        },
      ],
    },
    env: {
      APP_NAME: process.env.APP_NAME ?? "NextJS",
    },
    async rewrites() {
      return [
        {
          source: "/bai-viet",
          destination: "/blog",
        },
        {
          source: "/san-pham",
          destination: "/products",
        },
        {
          source: "/san-pham/:path*",
          destination: "/products/:path*",
        },
      ];
    },
    async headers() {
      return [
        {
          source: "/products/:path*",
          headers: [
            {
              key: "x-api-key",
              value: "secret",
            },
          ],
        },
        {
          source: "/products/:id",
          headers: [
            {
              key: "x-api-custom",
              value: "ahihi :id",
            },
            {
              key: "x-api-:id",
              value: "bhihi :id",
            },
          ],
        },
      ];
    },
  };
  return nextConfig;
};

export default NextConfig;
