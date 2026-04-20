import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tuyenitravel.com";

  // 1. Fetch all published blog posts from Sanity
  // OPTIMIZED: Using _updatedAt tells Google exactly when the post was last modified for recrawling
  const query = `*[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt
  }`;

  const posts = await client.fetch(query);

  // 2. Map the blog posts into the sitemap format
  const blogUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/${post.slug}`, // Note: Adjust to `${baseUrl}/blog/${post.slug}` if your posts live under /blog/
    lastModified: post.lastModified || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7, // OPTIMIZED: Strong priority for content marketing
  }));

  // 3. Define your static, high-value pages
  // OPTIMIZED: Granular control over priority and crawl frequency
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0, // Highest priority for the homepage
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9, // Core business page
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8, // High priority index page that updates often
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5, // Lower priority for legal/static docs
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 4. Combine and return the complete sitemap
  return [...staticUrls, ...blogUrls];
}