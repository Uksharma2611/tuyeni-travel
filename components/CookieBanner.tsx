"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted or declined cookies
    const consent = localStorage.getItem("tuyeni_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't jarringly pop up the exact millisecond the page loads
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("tuyeni_cookie_consent", "accepted");
    setShowBanner(false);
    // Note: If you add Google Analytics later, you would initialize it here.
  };

  const handleDecline = () => {
    localStorage.setItem("tuyeni_cookie_consent", "declined");
    setShowBanner(false);
    // Note: Ensure tracking scripts are disabled if declined.
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 md:bottom-4 md:left-4 md:w-auto pointer-events-none">
      <div 
        className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-6 md:max-w-sm pointer-events-auto transform transition-all duration-700 translate-y-0 opacity-100"
        role="dialog"
        aria-live="polite"
        aria-modal="false" // OPTIMIZED: Clarifies to screen readers that this doesn't trap focus
        aria-labelledby="cookie-banner-title" // OPTIMIZED: Links the dialog to its title
        aria-describedby="cookie-banner-desc" // OPTIMIZED: Links the dialog to its description
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-orange-100 p-2 rounded-full text-orange-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 id="cookie-banner-title" className="text-lg font-bold text-gray-900">
            Your Privacy
          </h3>
        </div>
        
        <p id="cookie-banner-desc" className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
          We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies as detailed in our{" "}
          <Link href="/privacy-policy" className="text-orange-500 hover:underline font-bold">
            Privacy Policy
          </Link>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-full transition-all active:scale-95 text-sm shadow-md"
          >
            Accept All
          </button>
          <button 
            onClick={handleDecline}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-full transition-all active:scale-95 text-sm"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}