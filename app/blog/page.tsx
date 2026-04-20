import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { client } from "../../sanity/lib/client";
import { ALL_POSTS_QUERY } from "../../sanity/lib/queries"; // THE FIX: Import query here
import { urlFor } from "../../sanity/lib/image"; // THE FIX: Import image builder here

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Trip Journals & Travel Blog | Tuyeni Travel",
  description:
    "Read stories, expert travel tips, and destination highlights from Namibia and beyond. Let your imagination wander before your feet do.",
  alternates: {
    canonical: "https://tuyenitravel.com/blog",
  },
  openGraph: {
    title: "Tuyeni Travel Journals | Namibia Safari Blog",
    description:
      "Read stories, expert travel tips, and destination highlights from Namibia and beyond. Let your imagination wander before your feet do.",
    url: "https://tuyenitravel.com/blog",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added Twitter card for robust social sharing previews
  twitter: {
    card: "summary_large_image",
    title: "Tuyeni Travel Journals | Namibia Safari Blog",
    description:
      "Read stories, expert travel tips, and destination highlights from Namibia and beyond. Let your imagination wander before your feet do.",
  },
  // OPTIMIZED: Explicit crawler instructions for rich search results
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Automatically rebuild the page in the background every 60 seconds if Sanity data changes
export const revalidate = 60;

export default async function Blog() {
  // Fetch the single hero video playbackId from the new blogPage document
  const query = `*[_type == "blogPage"][0].heroVideo.asset->playbackId`;
  const playbackId = await client.fetch(query);

  const video = playbackId ? {
    playbackId: playbackId,
    poster: `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`
  } : null;

  // THE FIX: Fetch and format all blog posts on the server to eliminate loading screens
  const fetchedPosts = await client.fetch(ALL_POSTS_QUERY);
  const formattedPosts = fetchedPosts.map((post: any) => ({
    ...post,
    date: post.date
      ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      : "Recent",
    imageUrl: post.mainImage
      ? urlFor(post.mainImage).width(800).format("webp").quality(80).url()
      : "https://images.pexels.com/photos/3305542/pexels-photo-3305542.jpeg?auto=compress&cs=tinysrgb&w=800",
  }));

  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tuyeni Travel Journals",
    description: "Stories, expert tips, and inspiration from the heart of Namibia and beyond.",
    url: "https://tuyenitravel.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Tuyeni Travel",
      url: "https://tuyenitravel.com", // OPTIMIZED: Added missing URL to link entity to your domain
      logo: {
        "@type": "ImageObject",
        url: "https://tuyenitravel.com/assets/logo.svg",
      },
    },
  };

  return (
    <>
      {/* Inject Structured Data into the head of the document safely */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Passing the fetched video AND the prefetched posts down to your client component */}
      <BlogClient sanityVideo={video} initialPosts={formattedPosts} />
    </>
  );
}