/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // টেলিগ্রামের ইউজার ফটো লোড করার জন্য এই ডোমেইনটি প্রয়োজন হতে পারে
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't.me',
            },
        ],
    },
    // যদি আপনি ভার্সেল-এ বিল্ড এরর এড়াতে চান
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
