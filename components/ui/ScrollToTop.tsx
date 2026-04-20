"use client";

import { useState, useEffect } from "react";
// Import the hook from the modern lenis/react package
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  // This gives us access to the Lenis instance
  const lenis = useLenis();

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Use the Lenis scrollTo method instead of window.scrollTo
    // This removes the conflict and works on the first click
    lenis?.scrollTo(0, {
      duration: 1.5, // Matches our global smooth scroll speed
    });
  };

  useEffect(() => {
    // OPTIMIZED: Added { passive: true } to improve scrolling performance 
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl transition-all duration-300 active:scale-90 flex items-center justify-center ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
        // OPTIMIZED: Prevents screen readers and keyboard users from focusing the button when hidden
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
      >
        {/* OPTIMIZED: Added aria-hidden to decorative SVG */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}