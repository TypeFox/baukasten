const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: '/baukasten',
    turbopack: {
        // Without this Next walks up past the repo, finds a stray lockfile in the
        // parent directory and treats it as the workspace root — which makes the
        // dev server watch every sibling project and eventually run out of memory.
        root: path.join(__dirname, '..', '..'),
    },
    compiler: {
        styledComponents: true,
    },
    transpilePackages: ['baukasten-ui', 'baukasten-ui-web-wrapper'],
    env: {
        NEXT_PUBLIC_BASE_PATH: '/baukasten',
    },
};

module.exports = nextConfig;
