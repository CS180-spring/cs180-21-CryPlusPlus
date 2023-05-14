/** @type {import('next').NextConfig} */
const nextConfig = {

	async rewrites() {
    return [
      {
        source: '/users',
        destination: 'http://localhost:80/users' // Proxy to Backend
      }
    ]
  }


}

module.exports = nextConfig
