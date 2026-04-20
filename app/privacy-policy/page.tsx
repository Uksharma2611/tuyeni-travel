import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Privacy Policy | Tuyeni Travel",
  description:
    "Learn how Tuyeni Travel protects your personal data, respects your privacy, and secures your booking information.",
  alternates: {
    canonical: "https://tuyenitravel.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Tuyeni Travel",
    description:
      "Learn how Tuyeni Travel protects your personal data, respects your privacy, and secures your booking information.",
    url: "https://tuyenitravel.com/privacy-policy",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added basic Twitter card for clean sharing
  twitter: {
    card: "summary",
    title: "Privacy Policy | Tuyeni Travel",
    description:
      "Learn how Tuyeni Travel protects your personal data, respects your privacy, and secures your booking information.",
  },
  // OPTIMIZED: Explicit crawler instructions
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - Tuyeni Travel",
    description:
      "Privacy policy and data protection practices for Tuyeni Travel.",
    url: "https://tuyenitravel.com/privacy-policy",
    publisher: {
      "@type": "TravelAgency",
      name: "Tuyeni Travel",
      url: "https://tuyenitravel.com", // OPTIMIZED: Tied entity back to root domain
      logo: "https://tuyenitravel.com/assets/logo.svg", // OPTIMIZED: Added official logo
    },
  };

  return (
    // OPTIMIZED: Changed div to main for semantic SEO
    <main className="min-h-screen bg-gray-50">
      {/* Inject Structured Data into the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section
        className="relative pt-48 pb-40 bg-gray-900 overflow-hidden"
        aria-label="Privacy Policy Hero"
      >
        {/* OPTIMIZED: Added aria-hidden to decorative background */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <Image
            // A calm, secure-feeling Namibian landscape
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
            alt="Calm Namibian landscape representing security and privacy" 
            fill
            sizes="100vw" // OPTIMIZED: Helps browser allocate resources efficiently
            className="object-cover"
            priority
            unoptimized // THE FIX: Bypasses Netlify image optimization failure for external URLs
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto font-medium">
            Your trust is our priority. Learn how we handle, protect, and
            respect your personal information.
          </p>
        </div>
      </section>

      {/* 2. POLICY CONTENT (Floating Card Design) */}
      <section
        className="relative z-20 px-6 -mt-24 pb-24"
        aria-label="Privacy Policy Content"
      >
        <div className="container mx-auto max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 lg:p-20 border border-gray-100">
          <p className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-12 border-b border-gray-100 pb-6">
            Last Updated: March 2026
          </p>

          <div className="space-y-12 text-gray-600 leading-relaxed text-lg">
            {/* Introduction */}
            <div>
              <p>
                At <strong>Tuyeni Travel</strong>, we are committed to
                protecting your privacy and ensuring the security of your
                personal data. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website, use our services, or communicate with us to plan your
                Namibian journey.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                1. Information We Collect
              </h2>
              <p>
                To provide you with seamless travel experiences, we may collect
                the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>
                  <strong>Personal Identification Information:</strong> Name,
                  email address, phone number, and physical address.
                </li>
                <li>
                  <strong>Travel Details:</strong> Passport information, dietary
                  requirements, medical conditions relevant to travel safety,
                  and emergency contact details.
                </li>
                <li>
                  <strong>Transaction Data:</strong> Payment details (processed
                  securely via third-party gateways) and booking history.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information automatically
                  collected when you browse our site, such as IP addresses,
                  browser types, and interaction metrics.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                2. How We Use Your Information
              </h2>
              <p>
                We use the data we collect exclusively to enhance your
                experience and fulfill our services, specifically to:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>
                  Design, process, and manage your travel itineraries and
                  bookings.
                </li>
                <li>
                  Secure reservations with our trusted partners, including
                  lodges, vehicle rental agencies, and tour operators.
                </li>
                <li>
                  Communicate with you regarding quotes, updates, and customer
                  support.
                </li>
                <li>
                  Improve our website functionality and service offerings.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                3. Information Sharing & Disclosure
              </h2>
              <p>
                <strong>We do not sell your personal data.</strong> However, to
                make your trip possible, we must share necessary details with
                trusted third parties. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>
                  <strong>Service Providers:</strong> Accommodation hosts, car
                  rental companies, and activity operators who require your name
                  or dietary needs.
                </li>
                <li>
                  <strong>Legal Obligations:</strong> When required by Namibian
                  law, border authorities, or to protect the safety and rights
                  of our clients and staff.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                personal data from unauthorized access, alteration, or
                disclosure. While no internet transmission is 100% secure, we
                utilize encrypted communication channels and restrict internal
                data access strictly to staff who require it to perform their
                duties.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                5. Your Privacy Rights
              </h2>
              <p>Depending on your jurisdiction, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>Request access to the personal data we hold about you.</li>
                <li>
                  Request corrections to inaccurate or incomplete information.
                </li>
                <li>
                  Request the deletion of your personal data, subject to legal
                  and operational retention requirements.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how your
                data is handled, please reach out to our team in Windhoek:
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                <p className="text-gray-900 font-bold mb-1">
                  Tuyeni Travel Data Controller
                </p>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href="mailto:bookings@tuyenitravel.com"
                    className="text-orange-500 hover:underline"
                  >
                    bookings@tuyenitravel.com
                  </a>
                </p>
                <p className="text-sm">Phone: +264 81 423 0007</p>
              </div>
            </div>
          </div>

          {/* Return CTA */}
          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 font-bold hover:text-orange-500 transition-colors"
            >
              <span className="text-xl" aria-hidden="true">
                ←
              </span>{" "}
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}