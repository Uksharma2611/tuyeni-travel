import { groq } from "next-sanity";

// OPTIMIZED: Grabbing the raw image objects ('mainImage') so our URL builder can process them
export const ALL_POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": "/blog/" + slug.current,
  mainImage,
  category,
  "date": publishedAt,
  readTime,
  excerpt,
  serviceCta
}`;

// OPTIMIZED: Grabbing both 'mainImage' and 'seoImage' raw objects
export const SINGLE_POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  mainImage,
  category,
  "date": publishedAt,
  readTime,
  body,
  excerpt,
  seoTitle,
  seoDescription,
  seoImage
}`;