import type { Metadata } from "next";
import HomeClient from "./HomeClient";
// IMPORTANT: Adjust this path to point to your actual Sanity client file
import { client } from "../sanity/lib/client"; 

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Namibia Safari Tours & Custom Travel | Experience Freedom with Tuyeni Travel",
  description:
    "Discover the ultimate Namibian adventure. From luxury desert lodges in Sossusvlei to premier wildlife viewing in Etosha. Book your custom journey today.",
  alternates: { 
    canonical: "https://tuyenitravel.com" 
  },
  openGraph: {
    title: "Namibia Safari Tours & Custom Travel | Tuyeni Travel",
    description:
      "Discover the ultimate Namibian adventure. From luxury desert lodges in Sossusvlei to premier wildlife viewing in Etosha.",
    url: "https://tuyenitravel.com",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added Twitter card for robust social sharing previews
  twitter: {
    card: "summary_large_image",
    title: "Namibia Safari Tours & Custom Travel | Tuyeni Travel",
    description:
      "Discover the ultimate Namibian adventure. From luxury desert lodges in Sossusvlei to premier wildlife viewing in Etosha. Book your custom journey today.",
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

export const revalidate = 60;

export default async function Home() {
  const query = `*[_type == "homepage"][0].heroVideos[].asset->playbackId`;
  const playbackIds = await client.fetch(query);

  // THE FIX: Just pass the raw playbackId instead of the MP4 url!
  const videos = playbackIds && playbackIds.length > 0 ? playbackIds.map((id: string) => ({
    playbackId: id, 
    poster: `https://image.mux.com/${id}/thumbnail.jpg?time=0`
  })) : [];

  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  // Establishes your core business entity for Google's Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tuyeni Travel",
    url: "https://tuyenitravel.com",
    logo: "https://tuyenitravel.com/assets/logo.svg",
    image: "https://tuyenitravel.com/assets/fourth.jpg",
    description:
      "Discover the ultimate Namibian adventure. From luxury desert lodges in Sossusvlei to premier wildlife viewing in Etosha.",
    telephone: "+264814230007",
    email: "bookings@tuyenitravel.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 August Gotz Street",
      addressLocality: "Windhoek",
      addressCountry: "Namibia",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.55941,
      longitude: 17.08323,
    }
  };

  return (
    <>
      {/* Inject Structured Data into the head of the document safely */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient sanityVideos={videos} />
    </>
  );
}