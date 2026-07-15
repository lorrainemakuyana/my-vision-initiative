/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /programs was the live URL before the page became /mviexperience.
      // Redirect permanently so existing links and search results keep working.
      {
        source: "/programs",
        destination: "/mviexperience",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
