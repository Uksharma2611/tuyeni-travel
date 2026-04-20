import type { Metadata } from "next";
import ContactClient from "./ContactClient";
// IMPORTANT: Adjust this path to point to your actual Sanity client file
import { client } from "../../sanity/lib/client"; 

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Contact Us | Book Your Namibia Safari | Tuyeni Travel",
  description:
    "Get in touch with Tuyeni Travel in Windhoek, Namibia. Contact our team via email, phone, or WhatsApp to start planning your custom African safari.",
  alternates: {
    canonical: "https://tuyenitravel.com/contact",
  },
  openGraph: {
    title: "Contact Tuyeni Travel | Start Your Adventure",
    description:
      "Get in touch with Tuyeni Travel in Windhoek, Namibia. Contact our team via email, phone, or WhatsApp to start planning your custom African safari.",
    url: "https://tuyenitravel.com/contact",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added Twitter card for robust social sharing previews
  twitter: {
    card: "summary_large_image",
    title: "Contact Tuyeni Travel | Start Your Adventure",
    description:
      "Get in touch with Tuyeni Travel in Windhoek, Namibia. Contact our team via email, phone, or WhatsApp to start planning your custom African safari.",
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

export default async function Contact() {
  // Fetch the single hero video playbackId from the new contactPage document
  const query = `*[_type == "contactPage"][0].heroVideo.asset->playbackId`;
  const playbackId = await client.fetch(query);

  const video = playbackId ? {
    playbackId: playbackId,
    poster: `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`
  } : null;

  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) LOCAL BUSINESS ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tuyeni Travel",
    image: "https://tuyenitravel.com/assets/logo.svg",
    logo: "https://tuyenitravel.com/assets/logo.svg", // OPTIMIZED: Added specific logo property
    "@id": "https://tuyenitravel.com",
    url: "https://tuyenitravel.com/contact", // OPTIMIZED: Pointed directly to the contact page
    telephone: "+264814230007",
    email: "bookings@tuyenitravel.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quantum House, C/O Haddy & Sam Nujoma Drive",
      addressLocality: "Windhoek",
      addressCountry: "Namibia", // OPTIMIZED: Matched exact formatting from other schemas
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.55941, // Example coordinates for Windhoek
      longitude: 17.08323,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };

  return (
    <>
      {/* OPTIMIZED: Inject Structured Data into the head of the document safely */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient sanityVideo={video} />
    </>
  );
}