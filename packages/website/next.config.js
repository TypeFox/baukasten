/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/baukasten',
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['baukasten-ui', 'baukasten-ui-web-wrapper'],
  env: {
    NEXT_PUBLIC_BASE_PATH: '/baukasten',
  },
}

module.exports = nextConfig
