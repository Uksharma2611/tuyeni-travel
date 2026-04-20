import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// --- OPTIMIZED PAGE METADATA ---
export const metadata: Metadata = {
  title: "Terms & Conditions | Tuyeni Travel",
  description:
    "Read the Terms and Conditions for booking your Namibian travel experience with Tuyeni Travel.",
  alternates: {
    canonical: "https://tuyenitravel.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Tuyeni Travel",
    description:
      "Read the Terms and Conditions for booking your Namibian travel experience with Tuyeni Travel.",
    url: "https://tuyenitravel.com/terms",
    siteName: "Tuyeni Travel",
    locale: "en_US",
    type: "website",
  },
  // OPTIMIZED: Added basic Twitter card for clean sharing previews
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Tuyeni Travel",
    description:
      "Read the Terms and Conditions for booking your Namibian travel experience with Tuyeni Travel.",
  },
  // OPTIMIZED: Explicit crawler instructions
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  // --- OPTIMIZED STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions - Tuyeni Travel",
    description:
      "Terms, conditions, booking policies, and legal agreements for Tuyeni Travel.",
    url: "https://tuyenitravel.com/terms",
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
        aria-label="Terms and Conditions Hero"
      >
        {/* OPTIMIZED: Added aria-hidden to decorative background */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <Image
            // A distinct, high-quality Namibian landscape (Verified Pexels Link)
            src="https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Vast Namibian landscape reflecting clear travel terms and conditions" // OPTIMIZED: Descriptive alt text
            fill
            sizes="100vw" // OPTIMIZED: Helps browser allocate resources efficiently
            className="object-cover object-[center_40%]"
            priority
            unoptimized
          />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Terms & <span className="text-orange-500">Conditions</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto font-medium">
            The guidelines and agreements that ensure your Namibian journey is
            safe, secure, and extraordinary.
          </p>
        </div>
      </section>

      {/* 2. POLICY CONTENT (Floating Card Design) */}
      <section
        className="relative z-20 px-6 -mt-24 pb-24"
        aria-label="Terms and Conditions Content"
      >
        <div className="container mx-auto max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 lg:p-20 border border-gray-100">
          <p className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-12 border-b border-gray-100 pb-6">
            Last Updated: March 2026
          </p>

          <div className="space-y-12 text-gray-600 leading-relaxed text-lg">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Tuyeni Travel</strong> ("we," "us," or
                "our"). These Terms and Conditions govern your use of our
                website and services. By accessing our website, communicating
                with our team, or booking our services, you agree to be bound by
                these Terms. If you do not agree with any part of these Terms,
                you must not use our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                2. Our Services
              </h2>
              <p>
                Tuyeni Travel is a luxury travel agency that designs and
                arranges bespoke travel experiences in Namibia. We offer a range
                of services, including itinerary planning, booking
                accommodations, arranging transportation, and organizing guided
                tours. Our services and listed itineraries are subject to change
                without notice due to weather, local conditions, or partner
                availability.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                3. Booking and Payment
              </h2>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>
                  <strong>Bookings:</strong> All bookings are subject to
                  availability and our official written confirmation. To secure
                  a booking, you must provide accurate information and pay the
                  required deposit.
                </li>
                <li>
                  <strong>Payment:</strong> We accept various secure payment
                  methods. Full payment is generally required 60 days prior to
                  the start of your travel, as specified in your booking
                  confirmation. You are responsible for any applicable bank fees
                  or currency conversion charges.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                4. Cancellations and Refunds
              </h2>
              <ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
                <li>
                  <strong>Cancellation by You:</strong> If you need to cancel
                  your booking, you must provide written notice to our team.
                  Cancellation charges will apply and are calculated based on
                  the date we receive your notice and the specific conditions of
                  our local partners.
                </li>
                <li>
                  <strong>Cancellation by Us:</strong> We reserve the right to
                  cancel your booking in exceptional circumstances (e.g.,
                  natural disasters, safety concerns). In such cases, we will
                  offer you a full refund or an alternative travel arrangement
                  of comparable quality.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                5. Travel Insurance
              </h2>
              <p>
                We <strong>strongly recommend</strong> that you obtain
                comprehensive travel insurance prior to your departure. This
                should protect you against unforeseen events, such as
                cancellation, medical emergencies, evacuation from remote areas,
                or lost luggage. Tuyeni Travel is not liable for costs incurred
                due to a lack of adequate insurance.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                6. Passports, Visas, and Health
              </h2>
              <p>
                You are solely responsible for ensuring that you possess a valid
                passport (with at least 6 months validity from your return
                date), necessary visas, and any required health documentation or
                vaccinations for your travel to Namibia. We are not liable for
                any disruptions or costs arising from your failure to comply
                with these legal requirements.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                7. Limitation of Liability
              </h2>
              <p>
                We act as a booking agent for our trusted local partners, such
                as hotels, airlines, vehicle rentals, and tour operators. We are
                not liable for any acts, omissions, delays, accidents, or
                injuries caused by these third-party partners. To the maximum
                extent permitted by Namibian law, our liability for any claim
                arising from your booking is limited strictly to the amount you
                paid for our services.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                8. Governing Law
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of the Republic of Namibia. Any
                disputes arising from your booking or use of our website will be
                subject to the exclusive jurisdiction of the Namibian courts.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                9. Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding these Terms and
                Conditions, please contact our legal and booking team:
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                <p className="text-gray-900 font-bold mb-1">
                  Tuyeni Travel Legal Department
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
          <div className="mt-16 pt-8 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 font-bold hover:text-orange-500 transition-colors"
            >
              <span className="text-xl" aria-hidden="true">
                ←
              </span>{" "}
              Return to Homepage
            </Link>
            <span className="hidden sm:block text-gray-300">|</span>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 text-gray-400 font-bold hover:text-orange-500 transition-colors"
            >
              View Privacy Policy{" "}
              <span className="text-xl" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}