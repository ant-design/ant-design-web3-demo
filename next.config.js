/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design",
    "antd",
    "rc-util",
    "rc-input",
    "rc-pagination",
    "rc-picker",
  ],
};

module.exports = nextConfig;
