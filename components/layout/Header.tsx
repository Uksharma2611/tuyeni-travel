"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react"; // ADDED: Import useLenis

export default function Header() {
  const pathname = usePathname();
  const router = useRouter(); 
  const lenis = useLenis(); // ADDED: Initialize Lenis
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we are currently on the Home Page
  const isHomePage = pathname === "/" || pathname === "/services" || pathname === "/about" || pathname === "/contact" || pathname==="/blog";

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.25;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll();
    // OPTIMIZED: Added { passive: true } for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Trip Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Function to handle scroll to top if already on the page
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault(); // CRITICAL FIX: Stops the double-click race condition

    const currentPath = pathname === "/" ? "/" : pathname?.replace(/\/$/, "");
    const targetPath = href === "/" ? "/" : href?.replace(/\/$/, "");

    if (currentPath === targetPath) {
      // Same page: Use Lenis for smooth scroll to top instead of window.scrollTo
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        // Fallback if Lenis isn't ready
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Different page: Route programmatically
      router.push(href);
    }
    
    // Close mobile menu safely
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        // Logic: Always white if not on Home, or if scrolled/menu open on Home
        !isHomePage || isScrolled || isMenuOpen
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-0"
          : "bg-transparent border-transparent py-1"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Logo Section */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2 group"
          aria-label="Tuyeni Travel Homepage"
          title="Tuyeni Travel Home" // OPTIMIZED: Added title for SEO context
        >
          <Image
            src="/assets/logo.svg"
            alt="Tuyeni Travel Logo"
            width={45}
            height={45}
            style={{ height: "auto" }}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span
            className={`text-2xl font-extrabold tracking-tight transition-colors duration-700 ${
              // Logic: Dark text if not on Home, or if scrolled/menu open on Home
              !isHomePage || isScrolled || isMenuOpen
                ? "text-gray-900"
                : "text-white"
            }`}
          >
            Tuyeni<span className="text-orange-500">Travel</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          role="navigation"
          className="hidden lg:flex items-center gap-10 text-base font-bold"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                title={link.name} // OPTIMIZED: Added title attribute
                className={`py-2 transition-colors duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : !isHomePage || isScrolled
                      ? "text-gray-900 hover:text-orange-500"
                      : "text-white hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/264814230007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="hidden md:flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-5 py-3 rounded-full text-sm font-bold shadow-md hover:border-[#25D366] hover:text-[#25D366] transition-all duration-400 active:scale-95"
          >
            <svg
              className="w-5 h-5 fill-current text-[#25D366]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.658.85 5.127 2.308 7.156L.626 24l5.006-1.583A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zM18.15 17.27c-.266.75-1.554 1.442-2.146 1.512-.591.07-1.341.168-3.791-.795-2.956-1.162-4.832-4.184-4.978-4.38-.146-.196-1.189-1.583-1.189-3.02 0-1.437.75-2.146 1.015-2.428.266-.282.576-.352.766-.352.19 0 .38.003.551.011.181.008.423-.07.662.505.24.576.819 2.003.89 2.146.071.144.118.312.023.504-.095.193-.146.312-.288.479-.142.167-.297.362-.423.491-.141.143-.292.298-.128.583.164.285.731 1.209 1.564 1.956 1.078.966 1.983 1.267 2.27 1.41.287.143.454.118.625-.07.172-.188.74-.863.938-1.16.198-.297.396-.247.658-.15.262.097 1.656.782 1.938.923.282.141.47.234.538.365.068.13.068.752-.198 1.502z" />
            </svg>
            WhatsApp Us
          </a>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            className={`lg:hidden focus:outline-none p-2 rounded-md transition-colors duration-500 ${
              !isHomePage || isScrolled || isMenuOpen
                ? "text-gray-900 hover:bg-gray-100/50"
                : "text-white hover:bg-white/10"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      <nav
        id="mobile-menu"
        aria-label="Mobile Navigation"
        aria-hidden={!isMenuOpen} // OPTIMIZED: Hide from screen readers when closed
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-white ${
          isMenuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 text-lg font-bold text-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={pathname === link.href ? "page" : undefined}
              tabIndex={isMenuOpen ? 0 : -1} // OPTIMIZED: Prevent keyboard tabbing when closed
              className={pathname === link.href ? "text-orange-500" : ""}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/264814230007"
            target="_blank" // OPTIMIZED: Added for security and SEO
            rel="noopener noreferrer" // OPTIMIZED: Required when using target="_blank"
            aria-label="Contact us on WhatsApp"
            tabIndex={isMenuOpen ? 0 : -1} // OPTIMIZED: Prevent keyboard tabbing when closed
            className="bg-orange-500 text-white text-center py-4 rounded-full shadow-lg"
          >
            WhatsApp Us
          </a>
        </div>
      </nav>
    </header>
  );
}