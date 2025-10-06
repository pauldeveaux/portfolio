import type {NextConfig} from "next";

require('dotenv').config()

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/api/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
                pathname: '/512/**',
            },
        ],
    },
};

export default nextConfig;
