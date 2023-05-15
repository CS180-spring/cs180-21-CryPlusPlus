/** @type {import('next').NextConfig} */
const nextConfig = {

	async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          destination: `http://localhost:80/:path*`,
        }
      ]
    }
 }  	
}
module.exports = nextConfig
