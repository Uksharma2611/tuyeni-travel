import { groq } from "next-sanity";

// This grabs all posts, orders them by newest first, and formats the exact data we need.
export const ALL_POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": "/blog/" + slug.current,
  "imageUrl": mainImage.asset->url,
  category,
  "date": publishedAt,
  readTime,
  excerpt,
  serviceCta
}`;

// OPTIMIZED: Now fetches the SEO fields for the individual post page
export const SINGLE_POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  "imageUrl": mainImage.asset->url,
  category,
  "date": publishedAt,
  readTime,
  body,
  excerpt,
  seoTitle,
  seoDescription,
  "seoImageUrl": seoImage.asset->url
}`;
