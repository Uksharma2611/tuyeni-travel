import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
// IMPORTANT: Adjust this path to point to your actual Sanity client file
import { client } from "../../sanity/lib/client"; 

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Our Services | Custom Tours, Safaris & Car Hire in Namibia",
  description:
    "Explore our range of travel services including custom itineraries, self-drive tours, guided safaris, 4x4 car hire, and luxury accommodation bookings in Namibia.",
  alternates: {
    canonical: "https://tuyenitravel.com/services",
  },
  openGraph: {
    title: "Tuyeni Travel Services | Tours, Safaris & 4x4 Hire",
    description:
      "Explore our range of travel services including custom itineraries, self-drive tours, guided safaris, 4x4 car hire, and luxury accommodation bookings in Namibia.",
    url: "https://tuyenitravel.com/services",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added Twitter card for robust social sharing previews
  twitter: {
    card: "summary_large_image",
    title: "Tuyeni Travel Services | Tours, Safaris & 4x4 Hire",
    description:
      "Explore our range of travel services including custom itineraries, self-drive tours, guided safaris, 4x4 car hire, and luxury accommodation bookings in Namibia.",
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

export default async function Services() {
  // Fetch the single hero video playbackId from the new servicesPage document
  const query = `*[_type == "servicesPage"][0].heroVideo.asset->playbackId`;
  const playbackId = await client.fetch(query);

  const video = playbackId ? {
    playbackId: playbackId,
    poster: `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`
  } : null;

  // --- STRUCTURED DATA (JSON-LD) ---
  // This explicitly lists out your top services for Google's Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tuyeni Travel Services",
    description:
      "Premium travel and safari services offered by Tuyeni Travel in Namibia.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Custom Itinerary Planning",
        description:
          "Personalized travel plans designed for your unique pace, interests, and budget in Namibia.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guided Group Tours",
        description:
          "Professional local guides offering safe and luxurious experiences in Etosha, Sossusvlei, and beyond.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Self-Drive Tours",
        description:
          "Meticulously planned routes, vehicle rentals, and pre-booked lodges for independent travelers.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Car Rental & 4x4 Hire",
        description:
          "Reliable 4x4 vehicles fully equipped for the Namibian terrain.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Luxury Accommodation Bookings",
        description:
          "Access to our exclusive network of luxury lodges, boutique hotels, and hidden wilderness retreats.",
      },
    ],
  };

  return (
    <>
      {/* OPTIMIZED: Safely inject Structured Data into the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient sanityVideo={video} />
    </>
  );
}