/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/baukasten',
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@baukasten/ui', '@baukasten/web-wrapper'],
}

module.exports = nextConfig
