import type { Metadata } from "next";
// IMPORTANT: Adjust this path to point to your actual Sanity client file
import { client } from "../../sanity/lib/client"; 
import AboutClient from "./AboutClient";

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "About Us | Tuyeni Travel",
  description:
    "Learn about Tuyeni Travel's founding story, our mission to connect you with the soul of Namibia, and our commitment to seamless, unforgettable journeys.",
  alternates: {
    canonical: "https://tuyenitravel.com/about", // Ensures Google indexes this exact URL
  },
  openGraph: {
    title: "About Tuyeni Travel | Our Story & Mission",
    description:
      "Learn about Tuyeni Travel's founding story, our mission to connect you with the soul of Namibia, and our commitment to seamless, unforgettable journeys.",
    url: "https://tuyenitravel.com/about",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added Twitter card for robust social sharing previews
  twitter: {
    card: "summary_large_image",
    title: "About Tuyeni Travel | Our Story & Mission",
    description:
      "Learn about Tuyeni Travel's founding story, our mission to connect you with the soul of Namibia, and our commitment to seamless, unforgettable journeys.",
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

export default async function AboutPage() {
  // Fetch the single hero video playbackId from the new aboutPage document
  const query = `*[_type == "aboutPage"][0].heroVideo.asset->playbackId`;
  const playbackId = await client.fetch(query);

  const video = playbackId ? {
    playbackId: playbackId,
    poster: `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`
  } : null;

  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  // Expanded to include logo, URL, and physical address for better Knowledge Graph mapping
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Tuyeni Travel",
      url: "https://tuyenitravel.com",
      logo: "https://tuyenitravel.com/assets/logo.svg",
      foundingDate: "2016",
      description:
        "Tuyeni Travel designs seamless, soulful, and unforgettable travel experiences from our base in Windhoek, Namibia.",
      identifier: "NTB Reg. No. BOO01067",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14 August Gotz Street",
        addressLocality: "Windhoek",
        addressCountry: "Namibia",
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
      <AboutClient sanityVideo={video} />
    </>
  );
}