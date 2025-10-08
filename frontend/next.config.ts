import type {NextConfig} from "next";


const CMS_UPLOAD_URL = process.env.CMS_API_URL || "http://localhost:1337";


const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: CMS_UPLOAD_URL.startsWith("https") ? "https" : "http",
                hostname: new URL(CMS_UPLOAD_URL).hostname,
                port: new URL(CMS_UPLOAD_URL).port || undefined,
                pathname: '/uploads/**',
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
