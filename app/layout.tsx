import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tuyenitravel.com"),
  // FIXED: Added alternates for canonical SEO URL to prevent duplicate content penalties
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Tuyeni Travel | Experience Freedom in Namibia",
    template: "%s | Tuyeni Travel",
  },
  description:
    "Explore Namibia's deserts and global cities with Tuyeni Travel. We craft seamless, soul-stirring journeys tailored to your way of adventure.",
  // OPTIMIZED: Added higher-intent search keywords
  keywords: [
    "Namibia Travel",
    "Namibia Safaris",
    "Custom Itineraries",
    "Self-drive Namibia",
    "Tuyeni Travel",
    "Luxury African Safari",
    "Guided Tours Namibia",
  ],
  authors: [{ name: "Tuyeni Travel" }],
  creator: "Tuyeni Travel",
  // OPTIMIZED: Prevents iOS from auto-styling numbers as ugly blue links
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tuyenitravel.com",
    siteName: "Tuyeni Travel",
    title: "Tuyeni Travel | Experience Freedom",
    description:
      "Tailor-made Namibian adventures and global journeys. Experience freedom with local insight.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tuyeni Travel Namibia Safari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuyeni Travel | Experience Freedom",
    description: "Seamless, soul-stirring journeys across Namibia and beyond.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tuyeni Travel",
    image: "https://tuyenitravel.com/assets/logo.svg",
    logo: "https://tuyenitravel.com/assets/logo.svg", // OPTIMIZED: Added official logo
    "@id": "https://tuyenitravel.com",
    url: "https://tuyenitravel.com",
    telephone: "+264814230007",
    email: "bookings@tuyenitravel.com", // OPTIMIZED: Added official email
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 August Gotz Street", // OPTIMIZED: Replaced placeholder with real data
      addressLocality: "Windhoek",
      addressCountry: "Namibia", // OPTIMIZED: Unified naming convention
    },
    description:
      "Seamless, soul-stirring journeys across Namibia and the world.",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    // OPTIMIZED: Added sameAs to link social profiles for Google Knowledge Graph
    sameAs: [
      "https://www.facebook.com/tuyenitravel",
      "https://www.instagram.com/tuyenitravel",
      // Add your real links here later
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* We use a Client Component here to handle the /studio check */}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}