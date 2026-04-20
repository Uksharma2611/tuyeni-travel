"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
// Import the Lenis hook to sync with your global smooth scroller
import { useLenis } from "lenis/react";
import MuxPlayer from "@mux/mux-player-react";

// --- COMPREHENSIVE FORM DROPDOWN DATA ---
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
].sort((a, b) => a.localeCompare(b));

const COUNTRY_CODES = [
  { code: "+1", label: "+1 (US/CA)" }, { code: "+7", label: "+7 (RU/KZ)" }, { code: "+20", label: "+20 (EG)" }, { code: "+27", label: "+27 (ZA)" }, { code: "+30", label: "+30 (GR)" }, { code: "+31", label: "+31 (NL)" }, { code: "+32", label: "+32 (BE)" }, { code: "+33", label: "+33 (FR)" }, { code: "+34", label: "+34 (ES)" }, { code: "+36", label: "+36 (HU)" }, { code: "+39", label: "+39 (IT)" }, { code: "+40", label: "+40 (RO)" }, { code: "+41", label: "+41 (CH)" }, { code: "+43", label: "+43 (AT)" }, { code: "+44", label: "+44 (UK)" }, { code: "+45", label: "+45 (DK)" }, { code: "+46", label: "+46 (SE)" }, { code: "+47", label: "+47 (NO)" }, { code: "+48", label: "+48 (PL)" }, { code: "+49", label: "+49 (DE)" }, { code: "+51", label: "+51 (PE)" }, { code: "+52", label: "+52 (MX)" }, { code: "+53", label: "+53 (CU)" }, { code: "+54", label: "+54 (AR)" }, { code: "+55", label: "+55 (BR)" }, { code: "+56", label: "+56 (CL)" }, { code: "+57", label: "+57 (CO)" }, { code: "+58", label: "+58 (VE)" }, { code: "+60", label: "+60 (MY)" }, { code: "+61", label: "+61 (AU)" }, { code: "+62", label: "+62 (ID)" }, { code: "+63", label: "+63 (PH)" }, { code: "+64", label: "+64 (NZ)" }, { code: "+65", label: "+65 (SG)" }, { code: "+66", label: "+66 (TH)" }, { code: "+81", label: "+81 (JP)" }, { code: "+82", label: "+82 (KR)" }, { code: "+84", label: "+84 (VN)" }, { code: "+86", label: "+86 (CN)" }, { code: "+90", label: "+90 (TR)" }, { code: "+91", label: "+91 (IN)" }, { code: "+92", label: "+92 (PK)" }, { code: "+93", label: "+93 (AF)" }, { code: "+94", label: "+94 (LK)" }, { code: "+95", label: "+95 (MM)" }, { code: "+98", label: "+98 (IR)" }, { code: "+211", label: "+211 (SS)" }, { code: "+212", label: "+212 (MA)" }, { code: "+213", label: "+213 (DZ)" }, { code: "+216", label: "+216 (TN)" }, { code: "+218", label: "+218 (LY)" }, { code: "+220", label: "+220 (GM)" }, { code: "+221", label: "+221 (SN)" }, { code: "+234", label: "+234 (NG)" }, { code: "+254", label: "+254 (KE)" }, { code: "+255", label: "+255 (TZ)" }, { code: "+256", label: "+256 (UG)" }, { code: "+260", label: "+260 (ZM)" }, { code: "+263", label: "+263 (ZW)" }, { code: "+264", label: "+264 (NA)" }, { code: "+351", label: "+351 (PT)" }, { code: "+353", label: "+353 (IE)" }, { code: "+358", label: "+358 (FI)" }, { code: "+380", label: "+380 (UA)" }, { code: "+971", label: "+971 (UAE)" }, { code: "+972", label: "+972 (IL)" }, { code: "+977", label: "+977 (NP)" }
];



interface HomeClientProps {
  sanityVideos?: { playbackId: string; poster: string }[];
}

export default function HomeClient({ sanityVideos = [] }: HomeClientProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isInitialImageVisible, setIsInitialImageVisible] = useState(true); 
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch((err) => console.log("Autoplay caught (expected):", err));
    }
  }, [currentVideoIndex]);

  // --- SMART ENQUIRY FORM STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
 

  const todayDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    tripType: "", dates: "", flexible: false, travelers: "", nationality: "",
    budget: "", preferences: "", name: "", email: "", phoneCode: "+1", phone: "",
  });

   const isValidName = /^[a-zA-Z\s\-']+$/.test(formData.name.trim());
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());


  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitEnquiry = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone ? `${formData.phoneCode} ${formData.phone}` : "",
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setSubmitStatus("idle");
      setFormData({
        tripType: "", dates: "", flexible: false, travelers: "", nationality: "",
        budget: "", preferences: "", name: "", email: "", phoneCode: "+1", phone: "",
      });
    }, 300);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center text-center px-6" aria-label="Main Hero">
        <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden">
          
          {/* SEO FIRST PAINT IMAGE - THE FIX */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-[600ms] ease-in-out ${
              isInitialImageVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true" // OPTIMIZED: Hide visual placeholder from screen readers
          >
            {/* OPTIMIZED: Replaced Next.js <Image> with standard <img> for instant unoptimized load */}
            <img
              src="/assets/fourth.jpg"
              alt="" // Kept empty because aria-hidden is true
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {sanityVideos.map((videoData, index) => {
            const isActive = index === currentVideoIndex;
            
            const nextIndex = currentVideoIndex === sanityVideos.length - 1 ? 0 : currentVideoIndex + 1;
            const isNext = index === nextIndex;
            const shouldPreload = isActive || isNext ? "auto" : "none";

            return (
              <div
                key={videoData.playbackId}
                className={`absolute inset-0 transition-all duration-[100ms] ease-in-out ${
                  isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                }`}
              >
                <MuxPlayer
                  ref={(el) => { videoRefs.current[index] = el as any; }}
                  playbackId={videoData.playbackId}
                  muted
                  autoPlay={isActive ? "muted" : false}
                  streamType="on-demand"
                  preload={shouldPreload} 
                  poster={videoData.poster}
                  minResolution="480p"
                  onPlaying={() => {
                    if (index === 0 && isInitialImageVisible) {
                      setTimeout(() => setIsInitialImageVisible(false), 200);
                    }
                  }}
                  onTimeUpdate={(e) => {
                    const video = e.target as HTMLMediaElement;
                    if (video && isActive && video.duration) {
                      const timeRemaining = video.duration - video.currentTime;
                      
                      if (timeRemaining > 0 && timeRemaining <= 1.0) {
                        setCurrentVideoIndex((prevIndex) =>
                          prevIndex === sanityVideos.length - 1 ? 0 : prevIndex + 1
                        );
                      }
                    }
                  }}
                  onEnded={() => {
                    if (isActive) {
                      setCurrentVideoIndex((prev) => (prev === sanityVideos.length - 1 ? 0 : prev + 1));
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    '--media-object-fit': 'cover',
                    '--media-object-position': 'bottom',
                    '--controls': 'none'
                  } as React.CSSProperties}
                />
              </div>
            );
          })}
          
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/35 via-black/20 to-transparent z-20 pointer-events-none" aria-hidden="true"></div>
        </div>

        <div className="relative z-30 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Experience Freedom with <br className="hidden md:block" />
            Tuyeni<span className="text-orange-500"> Travel</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl font-medium drop-shadow-md">
            Whether you&apos;re exploring Namibia’s deserts or discovering new
            cities abroad, Tuyeni Travel crafts seamless, soul-stirring
            journeys; your way.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Start planning your custom trip"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 active:scale-95"
            >
              Plan Your Trip
            </button>
            <Link
              href="/services"
              aria-label="View our travel services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-gray-500/30 hover:-translate-y-1 active:scale-95"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION BLOCK */}
      <section className="py-24 px-6 bg-white" aria-labelledby="intro-heading">
        <div className="container mx-auto max-w-3xl text-center">
          <h2
            id="intro-heading"
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Journeys Crafted For The Soul
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Tuyeni Travel, we believe that true exploration goes beyond just
            visiting a destination; it&apos;s about experiencing it. We
            specialize in curating highly personalized, seamless travel
            experiences that connect you to the heartbeat of the world.
          </p>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW GRID */}
      <section
        className="py-24 px-6 bg-gray-50"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto lg:px-12">
          <div className="text-center mb-16">
            <h2
              id="services-heading"
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              How We Serve You
            </h2>
            <div
              className="w-24 h-1 bg-orange-500 mx-auto rounded-full"
              aria-hidden="true"
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
              <div
                className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Custom Itineraries
              </h3>
              <p className="text-gray-600 mb-6">
                Tailor-made travel plans designed around your unique pace,
                preferences, and budget.
              </p>
              <Link
                href="/services"
                className="text-orange-500 font-semibold group-hover:text-orange-600 flex items-center gap-2"
              >
                Learn more{" "}
                <span
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
              <div
                className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Self-Drive Tours
              </h3>
              <p className="text-gray-600 mb-6">
                Take the wheel and explore at your own pace with our
                meticulously planned self-drive routes.
              </p>
              <Link
                href="/services"
                className="text-orange-500 font-semibold group-hover:text-orange-600 flex items-center gap-2"
              >
                Learn more{" "}
                <span
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
              <div
                className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Guided Safaris
              </h3>
              <p className="text-gray-600 mb-6">
                Immerse yourself in nature with our expert local guides ensuring
                a safe and unforgettable experience.
              </p>
              <Link
                href="/services"
                className="text-orange-500 font-semibold group-hover:text-orange-600 flex items-center gap-2"
              >
                Learn more{" "}
                <span
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section
        className="py-24 px-6 bg-white"
        aria-labelledby="testimonials-heading"
      >
        <div className="container mx-auto lg:px-12 text-center">
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold text-gray-900 mb-12"
          >
            What Our Travelers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
            <figure className="italic text-gray-600 bg-gray-50 p-8 rounded-2xl relative border-l-4 border-orange-500 shadow-sm">
              <blockquote className="mb-4">
                &quot;Tuyeni Travel transformed our Etosha safari into something
                truly magical. Everything from the vehicle to the hidden lodge
                gems was perfect.&quot;
              </blockquote>
              <figcaption className="not-italic font-bold text-gray-900">
                — Sarah J., Cape Town
              </figcaption>
            </figure>
            <figure className="italic text-gray-600 bg-gray-50 p-8 rounded-2xl relative border-l-4 border-orange-500 shadow-sm">
              <blockquote className="mb-4">
                &quot;Watching the sunrise over Sossusvlei was a life-changing
                experience. The planning was seamless and allowed us to focus
                entirely on the beauty of the desert.&quot;
              </blockquote>
              <figcaption className="not-italic font-bold text-gray-900">
                — Thomas B., London
              </figcaption>
            </figure>
            <figure className="italic text-gray-600 bg-gray-50 p-8 rounded-2xl relative border-l-4 border-orange-500 shadow-sm">
              <blockquote className="mb-4">
                &quot;A breathtaking experience along the Skeleton Coast. The
                local knowledge and expert guides made our family adventure
                completely stress-free.&quot;
              </blockquote>
              <figcaption className="not-italic font-bold text-gray-900">
                — Elena M., Munich
              </figcaption>
            </figure>
            <figure className="italic text-gray-600 bg-gray-50 p-8 rounded-2xl relative border-l-4 border-orange-500 shadow-sm">
              <blockquote className="mb-4">
                &quot;From the vastness of Damaraland to the charm of
                Swakopmund, the attention to detail was incredible. Tuyeni
                Travel made our dream Namibian road trip a reality.&quot;
              </blockquote>
              <figcaption className="not-italic font-bold text-gray-900">
                — Marcus W., New York
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section
        className="py-20 px-6 bg-[#FFF5F0] text-center border-t border-orange-100"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto max-w-4xl">
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Ready to Experience Freedom?
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let us handle the details while you enjoy the journey. Get in touch
            today to start planning your next great adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://wa.me/264814230007"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 active:scale-95"
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
            <Link
              href="/contact"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* --- SMART ENQUIRY MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90dvh]">
            {/* Header */}
            <div className="shrink-0 px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Plan Your Trip
                </h3>
                {submitStatus === "idle" && (
                  <p className="text-sm text-gray-500 font-medium">
                    Step {step} of 6
                  </p>
                )}
              </div>
              <button
                onClick={closeModal}
                aria-label="Close form"
                className="text-gray-400 hover:text-gray-900 bg-white rounded-full p-2 border border-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5"
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

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 min-h-0">
              {/* SUCCESS MESSAGE */}
              {submitStatus === "success" && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    Request Sent!
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Thank you for choosing Tuyeni Travel. Our team will review
                    your preferences and get back to you with a custom itinerary
                    shortly.
                  </p>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {submitStatus === "error" && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    Oops!
                  </h4>
                  <p className="text-gray-600 text-lg mb-6">
                    Something went wrong while sending your request. Please try
                    again or contact us via WhatsApp.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-black"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* FORM STEPS */}
              {submitStatus === "idle" && (
                <>
                  {/* Step 1: Trip Type */}
                  {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        What type of journey are you looking for?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Self-drive",
                          "Guided Safari",
                          "Corporate Travel",
                          "Car Hire Only",
                          "Camping Expedition",
                        ].map((type) => (
                          <label
                            key={type}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.tripType === type ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"}`}
                          >
                            <input
                              type="radio"
                              name="tripType"
                              value={type}
                              checked={formData.tripType === type}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span
                              className={`font-bold ${formData.tripType === type ? "text-orange-600" : "text-gray-700"}`}
                            >
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Dates */}
                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        When would you like to travel?
                      </h4>
                      <div className="mb-6">
                        {/* OPTIMIZED: Added htmlFor and id for A11y */}
                        <label htmlFor="tripDates" className="block text-sm font-bold text-gray-700 mb-2">
                          Estimated Arrival Date
                        </label>
                        <input
                          id="tripDates"
                          type="date"
                          name="dates"
                          min={todayDate}
                          value={formData.dates}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white text-gray-900"
                        />
                      </div>
                      <label htmlFor="isFlexible" className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <input
                          id="isFlexible"
                          type="checkbox"
                          name="flexible"
                          checked={formData.flexible}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                        />
                        <span className="font-medium text-gray-700">
                          My dates are flexible
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Step 3: Travelers & Nationality */}
                  {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Who is traveling?
                      </h4>
                      <div className="space-y-6">
                        <div>
                          {/* OPTIMIZED: Added htmlFor and id for A11y */}
                          <label htmlFor="travelerCount" className="block text-sm font-bold text-gray-700 mb-2">
                            Total Number of Travelers
                          </label>
                          <input
                            id="travelerCount"
                            type="text"
                            name="travelers"
                            placeholder="e.g., 2"
                            value={formData.travelers}
                            onChange={handleInputChange}
                            onInput={(e) =>
                              (e.currentTarget.value =
                                e.currentTarget.value.replace(/[^0-9]/g, ""))
                            }
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="userNationality" className="block text-sm font-bold text-gray-700 mb-2">
                            Primary Nationality / Country
                          </label>
                          <select
                            id="userNationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white text-gray-900"
                          >
                            <option value="" disabled>
                              Select your country
                            </option>
                            {COUNTRIES.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        What is your estimated budget per person?
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">
                        Excluding international flights.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "Budget / Camping ($1000 - $2000)",
                          "Mid-Range / Lodges ($2000 - $4000)",
                          "Luxury ($4000 - $7000+)",
                          "Not sure yet / Need advice",
                        ].map((budget) => (
                          <label
                            key={budget}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.budget === budget ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"}`}
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={budget}
                              checked={formData.budget === budget}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span
                              className={`font-bold ${formData.budget === budget ? "text-orange-600" : "text-gray-700"}`}
                            >
                              {budget}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Preferences */}
                  {step === 5 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Any specific preferences?
                      </h4>
                      <div className="mb-2">
                        {/* OPTIMIZED: Added htmlFor and id for A11y */}
                        <label htmlFor="userPreferences" className="block text-sm font-bold text-gray-700 mb-2">
                          Lodging style, activities, or specific destinations
                        </label>
                        <textarea
                          id="userPreferences"
                          name="preferences"
                          rows={4}
                          placeholder="I prefer luxury lodges, definitely want a 4x4, and hope to see rhinos..."
                          value={formData.preferences}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Contact */}
                  {step === 6 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Where should we send your itinerary?
                      </h4>
                      <div className="space-y-4">
                        <div>
                          {/* OPTIMIZED: Added htmlFor and id for A11y */}
                          <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            id="contactName"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="contactEmail" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            id="contactEmail"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="contactPhone" className="block text-sm font-bold text-gray-700 mb-2">
                            Phone Number / WhatsApp
                          </label>
                          <div className="flex gap-3">
                            <select
                              name="phoneCode"
                              aria-label="Country Code"
                              value={formData.phoneCode}
                              onChange={handleInputChange}
                              className="w-[140px] shrink-0 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white text-gray-900"
                            >
                              {COUNTRY_CODES.map((code) => (
                                <option key={code.label} value={code.code}>
                                  {code.label}
                                </option>
                              ))}
                            </select>
                            <input
                              id="contactPhone"
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onInput={(e) =>
                                (e.currentTarget.value =
                                  e.currentTarget.value.replace(/[^0-9]/g, ""))
                              }
                              className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Buttons */}
            {submitStatus === "idle" && (
              <div className="shrink-0 px-6 py-5 md:px-8 border-t border-gray-100 bg-white flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`font-bold transition-colors ${step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-orange-500"}`}
                >
                  Back
                </button>

                {step < 6 ? (
                  <button
                    onClick={nextStep}
                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all active:scale-95"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={submitEnquiry}
                    disabled={
                      isSubmitting ||
                      !isValidName ||
                      !isValidEmail ||
                      !formData.phone ||
                      formData.phone.length == 10  // THE FIX: Minimum length requirement for phone number
                    }
                    className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[150px]"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
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
                      "Send Request"
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}