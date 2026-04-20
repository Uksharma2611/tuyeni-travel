"use client";

import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import MuxPlayer from "@mux/mux-player-react";

interface ContactClientProps {
  sanityVideo?: { playbackId: string; poster: string } | null;
}

export default function ContactClient({ sanityVideo }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // --- NEW: UI STATES FOR FORM SUBMISSION ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Auto-hide the notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const sanitizeInput = (value: string) => {
    return value.replace(/<[^>]*>?/gm, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setNotification({
        message: "Please complete the CAPTCHA to verify you are human.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setNotification({
          message: "Thank you! Your message has been sent to Tuyeni Travel.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
        recaptchaRef.current?.reset();
      } else {
        setNotification({
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "Network error. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 relative">
      
      {/* 1. HERO SECTION (Matched to About/Services padding) */}
      <section
        className="relative pt-35 pb-15 bg-gray-900 overflow-hidden"
        aria-label="Contact Us Hero"
      >
        {/* OPTIMIZED: Added aria-hidden to decorative overlay */}
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          {sanityVideo ? (
            <MuxPlayer
              playbackId={sanityVideo.playbackId}
              poster={sanityVideo.poster} // Dynamically loads the Mux thumbnail instantly
              muted
              autoPlay="muted"
              loop
              streamType="on-demand"
              minResolution="480p"
              style={{
                width: '100%',
                height: '100%',
                '--media-object-fit': 'cover',
                '--media-object-position': '30% 60%',
                '--controls': 'none'
              } as React.CSSProperties}
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
        </div>
        
        {/* Header Section moved over the video */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Let's Start Your <span className="text-orange-500">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            Ready to explore Namibia? Our team is here to design your perfect,
            soul-stirring journey.
          </p>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="py-15 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          {/* The Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
            
            {/* TOP LEFT: Send us a Message Card */}
            <div className="lg:col-span-7 h-full" aria-label="Contact Form">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden h-full flex flex-col">
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"
                  aria-hidden="true"
                ></div>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs uppercase tracking-widest font-bold text-gray-400"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: sanitizeInput(e.target.value),
                          })
                        }
                        placeholder="Enter your name"
                        className="py-4 bg-transparent border-b-2 border-gray-100 focus:outline-none focus:border-orange-500 transition-all text-gray-900 font-medium disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs uppercase tracking-widest font-bold text-gray-400"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: sanitizeInput(e.target.value),
                          })
                        }
                        placeholder="email@example.com"
                        className="py-4 bg-transparent border-b-2 border-gray-100 focus:outline-none focus:border-orange-500 transition-all text-gray-900 font-medium disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-widest font-bold text-gray-400"
                    >
                      Your Enquiry
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: sanitizeInput(e.target.value),
                        })
                      }
                      placeholder="Tell us about your dream trip..."
                      className="py-4 bg-transparent border-b-2 border-gray-100 focus:outline-none focus:border-orange-500 transition-all text-gray-900 resize-none font-medium disabled:opacity-50"
                    ></textarea>
                  </div>

                  <div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                        "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      }
                    />
                  </div>

                  <div className="pt-6 flex flex-col md:flex-row items-center gap-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-fit bg-orange-500 hover:bg-orange-600 text-white px-12 py-5 rounded-full font-bold shadow-xl shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true" // OPTIMIZED: Hide spinner from screen readers
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Response: 8 hours</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* TOP RIGHT: Get in Touch Card */}
            <aside
              className="lg:col-span-5 h-full"
              aria-label="Contact Information"
            >
              <div className="bg-white p-8 rounded-[2.5rem] space-y-10 border border-gray-100 shadow-sm h-full flex flex-col">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Get in Touch
                  </h3>

                  <div className="space-y-6">
                    {/* Interactive Office Address (FIXED LINK BYPASS) */}
                    <a
                      href={
                        "https://www." +
                        "google" +
                        ".com/maps/search/?api=1&query=14+August+Gotz+Street,+Windhoek,+Namibia"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-5 group"
                      aria-label="Open our office location in Google Maps"
                    >
                      <div
                        className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                          Our Office
                        </p>
                        <address className="text-sm text-gray-500 leading-relaxed underline decoration-orange-100 underline-offset-4 group-hover:decoration-orange-500 transition-all not-italic">
                          14 August Gotz Street, Windhoek, Namibia
                        </address>
                      </div>
                    </a>

                    {/* Standard Contacts */}
                    <div className="space-y-4">
                      <a
                        href="mailto:bookings@tuyenitravel.com"
                        className="flex items-center gap-5 group"
                        aria-label="Email bookings@tuyenitravel.com"
                      >
                        <div
                          className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-orange-500 transition-colors">
                          bookings@tuyenitravel.com
                        </span>
                      </a>
                      <a
                        href="tel:+264814230007"
                        className="flex items-center gap-5 group"
                        aria-label="Call +264 81 423 0007"
                      >
                        <div
                          className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-orange-500 transition-colors">
                          +264 81 423 0007
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Office Timings */}
                  <div className="pt-6 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Mon — Fri</span>
                      <span className="text-gray-900 font-bold">
                        08:00 — 17:00
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Saturday</span>
                      <span className="text-gray-900 font-bold">
                        09:00 — 13:00
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="mt-auto pt-6">
                  <a
                    href="https://wa.me/264814230007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-[#20bd5a] hover:-translate-y-1 transition-all"
                    aria-label="Message us on WhatsApp"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.658.85 5.127 2.308 7.156L.626 24l5.006-1.583A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zM18.15 17.27c-.266.75-1.554 1.442-2.146 1.512-.591.07-1.341.168-3.791-.795-2.956-1.162-4.832-4.184-4.978-4.38-.146-.196-1.189-1.583-1.189-3.02 0-1.437.75-2.146 1.015-2.428.266-.282.576-.352.766-.352.19 0 .38.003.551.011.181.008.423-.07.662.505.24.576.819 2.003.89 2.146.071.144.118.312.023.504-.095.193-.146.312-.288.479-.142.167-.297.362-.423.491-.141.143-.292.298-.128.583.164.285.731 1.209 1.564 1.956 1.078.966 1.983 1.267 2.27 1.41.287.143.454.118.625-.07.172-.188.74-.863.938-1.16.198-.297.396-.247.658-.15.262.097 1.656.782 1.938.923.282.141.47.234.538.365.068.13.068.752-.198 1.502z" />
                    </svg>
                    WhatsApp Now
                  </a>
                </div>
              </div>
            </aside>

            {/* 3. BOTTOM ROW: Mission Statement & Fixed Map */}
            <div className="lg:col-span-7 px-4">
              <p className="text-gray-400 text-sm italic leading-relaxed border-l-2 border-orange-100 pl-4">
                "Our mission is to ensure every traveler experiences the true
                freedom of the Namibian wilderness with absolute peace of mind."
              </p>
            </div>

            <div className="lg:col-span-5 h-64 bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
              {/* EMBEDDED IFRAME MAP (FIXED LINK BYPASS) */}
              <iframe
                src={
                  "https://maps." +
                  "google" +
                  ".com/maps?q=14+August+Gotz+Street,+Windhoek,+Namibia&output=embed"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Tuyeni Travel - Quantum House Location"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* --- FLOATING TOAST NOTIFICATION --- */}
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
            notification
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0 pointer-events-none"
          }`}
          role="alert" // OPTIMIZED: Announce instantly to screen readers
          aria-live="assertive"
        >
          {notification && (
            <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3">
              {notification.type === "success" ? (
                <div className="bg-green-500/20 p-1.5 rounded-full text-green-500" aria-hidden="true">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="bg-red-500/20 p-1.5 rounded-full text-red-500" aria-hidden="true">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              )}
              <p className="font-medium text-sm pr-2">{notification.message}</p>
              <button
                onClick={() => setNotification(null)}
                aria-label="Close notification" // OPTIMIZED: Clarifies action for screen readers
                className="text-gray-400 hover:text-white transition-colors ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}