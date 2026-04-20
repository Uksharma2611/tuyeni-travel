"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react"; // ADDED: Import useLenis

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis(); // ADDED: Initialize Lenis
  const currentYear = new Date().getFullYear();

  // Function to handle scroll to top if already on the page without double-click bugs
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault(); // Stop default Next.js routing

    // Normalize paths to avoid trailing slash mismatches
    const currentPath = pathname === "/" ? "/" : pathname?.replace(/\/$/, "");
    const targetPath = href === "/" ? "/" : href?.replace(/\/$/, "");

    if (currentPath === targetPath) {
      // Same page: Use Lenis for smooth scroll to top instead of window.scrollTo
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        // Fallback if Lenis isn't ready
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      // Different page: Route programmatically
      router.push(href);
    }
  };

  return (
    <footer className="bg-gray-150 text-gray-700 py-12 border-t-2 border-gray-300">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-2"
              aria-label="Tuyeni Travel Home"
              title="Tuyeni Travel Home"
            >
              <Image
                src="/assets/logo.svg"
                alt="Tuyeni Travel Logo"
                width={40}
                height={40}
                style={{ height: "auto" }}
                className="object-contain"
              />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Tuyeni<span className="text-orange-500">Travel</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-2">
              Local Insight. Global Reach. Infinite Journeys. Designing
              experiences that are seamless, soulful, and unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h4 className="font-bold text-gray-900 mb-4 tracking-wide">
              Quick Links
            </h4>
            {/* OPTIMIZED: Added role="list" to guarantee screen reader enumeration */}
            <ul className="flex flex-col gap-3 text-sm font-medium" role="list">
              <li>
                <Link
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  className="hover:text-orange-500 transition-colors duration-200"
                  title="Tuyeni Travel Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={(e) => handleNavClick(e, "/about")}
                  className="hover:text-orange-500 transition-colors duration-200"
                  title="About Tuyeni Travel"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={(e) => handleNavClick(e, "/services")}
                  className="hover:text-orange-500 transition-colors duration-200"
                  title="Tuyeni Travel Services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={(e) => handleNavClick(e, "/blog")}
                  className="hover:text-orange-500 transition-colors duration-200"
                  title="Tuyeni Travel Blog"
                >
                  Trip Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={(e) => handleNavClick(e, "/contact")}
                  className="hover:text-orange-500 transition-colors duration-200"
                  title="Contact Tuyeni Travel"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact & Socials */}
          <section aria-labelledby="footer-contact">
            <h4
              id="footer-contact"
              className="font-bold text-gray-900 mb-4 tracking-wide"
            >
              Connect With Us
            </h4>
            <address className="not-italic">
              <ul className="flex flex-col gap-3 text-sm font-medium mb-6" role="list">
                <li>
                  <a
                    href="https://wa.me/264814230007"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    title="WhatsApp Tuyeni Travel"
                    className="flex items-center gap-2 hover:text-[#25D366] transition-colors duration-200 group"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-[#25D366] group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.658.85 5.127 2.308 7.156L.626 24l5.006-1.583A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zM18.15 17.27c-.266.75-1.554 1.442-2.146 1.512-.591.07-1.341.168-3.791-.795-2.956-1.162-4.832-4.184-4.978-4.38-.146-.196-1.189-1.583-1.189-3.02 0-1.437.75-2.146 1.015-2.428.266-.282.576-.352.766-.352.19 0 .38.003.551.011.181.008.423-.07.662.505.24.576.819 2.003.89 2.146.071.144.118.312.023.504-.095.193-.146.312-.288.479-.142.167-.297.362-.423.491-.141.143-.292.298-.128.583.164.285.731 1.209 1.564 1.956 1.078.966 1.983 1.267 2.27 1.41.287.143.454.118.625-.07.172-.188.74-.863.938-1.16.198-.297.396-.247.658-.15.262.097 1.656.782 1.938.923.282.141.47.234.538.365.068.13.068.752-.198 1.502z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bookings@tuyenitravel.com"
                    aria-label="Email us at bookings@tuyenitravel.com"
                    title="Email Tuyeni Travel"
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 group"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-orange-500 transition-colors duration-200"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 11.9-1.44L12 11l6.7-4.19a.85.85 0 11.9 1.44z" />
                    </svg>
                    bookings@tuyenitravel.com
                  </a>
                </li>
              </ul>
            </address>

            <nav className="flex gap-4" aria-label="Social Media Links">
              <a
                href="https://www.facebook.com/tuyenitravel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                title="Tuyeni Travel Facebook"
                className="text-gray-400 hover:text-[#1877F2] hover:scale-110 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tuyenitravel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram profile"
                title="Tuyeni Travel Instagram"
                className="text-gray-400 hover:text-[#E4405F] hover:scale-110 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.469 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </nav>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>&copy; {currentYear} Tuyeni Travel. All Rights Reserved.</p>

          <nav className="flex items-center gap-4" aria-label="Legal Links">
            <Link
              href="/privacy-policy"
              onClick={(e) => handleNavClick(e, "/privacy-policy")}
              className="hover:text-orange-500 transition-colors"
              title="Tuyeni Travel Privacy Policy"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms"
              onClick={(e) => handleNavClick(e, "/terms")}
              className="hover:text-orange-500 transition-colors"
              title="Tuyeni Travel Terms & Conditions"
            >
              Terms & Conditions
            </Link>
          </nav>

          <p>
            Powered by{" "}
            {/* OPTIMIZED: Added aria-label and title for accessibility and external link context */}
            <a
              href="https://yagniinfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website developed by YAGNI Infotech"
              title="Visit YAGNI Infotech"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              YAGNI Infotech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}