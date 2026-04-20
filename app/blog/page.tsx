import type { Metadata } from "next";
import BlogClient from "./BlogClient";
// IMPORTANT: Adjust this path to point to your actual Sanity client file
import { client } from "../../sanity/lib/client"; 

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
      {/* Passing the fetched video down to your client component */}
      <BlogClient sanityVideo={video} />
    </>
  );
}