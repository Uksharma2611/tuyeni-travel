import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tuyenitravel.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/', // Prevents Google from trying to crawl your Sanity CMS
        '/api/',    // Prevents Google from crawling your backend form endpoints
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}