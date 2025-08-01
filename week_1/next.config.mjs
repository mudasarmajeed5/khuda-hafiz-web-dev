/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [
            {
                // matching all API routes
                source: "/(.*)",
                headers: [
                    // other headers omitted for brevity...
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                ]
            }
        ]
    }
};

export default nextConfig;
