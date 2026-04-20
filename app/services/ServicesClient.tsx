"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// Import the Lenis hook to sync with your global smooth scroller
import { useLenis } from "lenis/react";
import MuxPlayer from "@mux/mux-player-react";

// 1. Full Service Data
const allServices = [
  {
    title: "Itinerary Planning",
    description:
      "Your dream trip, exactly how you imagined it. We design personalized travel plans that match your pace, interests, and budget, ensuring a soul-stirring journey across Namibia.",
    longDescription:
      "Planning a trip to Namibia requires deep local knowledge to master the vast distances, seasonal changes, and hidden gems. Our itinerary planning service takes the guesswork out of your adventure. We start with a consultation to understand your travel style—whether you crave luxury lodges or rugged camping—and build a seamless, day-by-day plan.",
    features: [
      "1-on-1 travel consultation",
      "Customized day-by-day routing",
      "Budget optimization",
      "Insider recommendations for dining and activities",
    ],
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.944L9 4m0 16l6-3m-6 3V4m6 13l5.447 2.724A2 2 0 0021 17.82V9.118a2 2 0 00-1.553-1.944L15 4m0 13V4" />
      </svg>
    ),
  },
  {
    title: "Guided Group Tours",
    description:
      "Experience the wild with the experts. Our professional local guides bring the landscape to life, sharing hidden secrets of Etosha and Sossusvlei with safety and luxury.",
    longDescription:
      "There is no substitute for exploring the African wilderness with someone who knows it intimately. Our guided group tours offer a stress-free, deeply educational experience. From tracking elusive rhinos in Etosha to understanding the ancient geology of the Namib Desert, our registered guides handle the logistics while you focus on the magic.",
    features: [
      "Expert, NTB-registered local guides",
      "Comfortable, air-conditioned safari vehicles",
      "All park entry fees and logistics handled",
      "Small group sizes for an intimate experience",
    ],
    image:
      "https://images.pexels.com/photos/9942902/pexels-photo-9942902.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Self-Drive Tours",
    description:
      "For the independent spirit. We provide meticulously planned routes, vehicle rentals, and pre-booked lodges, giving you the freedom of the open road with expert planning.",
    longDescription:
      "Namibia is hailed as one of the greatest self-drive destinations on earth. We empower you to take the wheel with confidence. We provide reliable 4x4s, detailed route maps, emergency contacts, and pre-booked campsites or luxury lodges, ensuring you have the ultimate freedom without the organizational headache.",
    features: [
      "Fully equipped 4x4 rental arrangements",
      "Comprehensive digital and physical route maps",
      "Pre-booked campsites or lodges along the route",
      "24/7 on-the-ground emergency support",
    ],
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Car Rental & 4x4 Hire",
    description:
      "Reliable 4x4 vehicles equipped for the Namibian terrain. Whether you're crossing dunes or gravel plains, our fleet is maintained for absolute peace of mind.",
    longDescription:
      "The right vehicle is the difference between an unforgettable trip and a stressful ordeal. We partner with the most reputable rental agencies in Namibia to secure robust, well-maintained 4x4s and SUVs. From double-cab bakkies for camping to luxury SUVs for lodge-hopping, we match you with the perfect ride.",
    features: [
      "Premium zero-excess insurance options",
      "Vehicles equipped with dual batteries and long-range tanks",
      "Airport pickup and drop-off coordination",
      "Thorough vehicle handover and briefing",
    ],
    image:
      "https://images.pexels.com/photos/6510638/pexels-photo-6510638.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zm0 0h5l3 3m-3-3l-3-3" />
      </svg>
    ),
  },
  {
    title: "Accommodation Bookings",
    description:
      "Access our exclusive network of luxury lodges, boutique hotels, and hidden wilderness retreats across the country.",
    longDescription:
      "Securing the best rooms in high season can be nearly impossible without local connections. We leverage our network to book you into Namibia's finest accommodations. Whether you want to sleep under the stars in a luxury desert suite or relax in a boutique coastal hotel, we handle every reservation.",
    features: [
      "Access to highly sought-after properties",
      "Seamless management of deposits and final payments",
      "Dietary and special request coordination",
      "Exclusive perks through our partner network",
    ],
    image:
      "https://images.pexels.com/photos/18611224/pexels-photo-18611224.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Reservations",
    description:
      "Hassle-free booking for park entries, national monuments, and specialized local activities.",
    longDescription:
      "Beyond just a bed to sleep in, a great trip requires seamless access to activities. We pre-book all your essential permits and experiences, from sunrise hot air balloon flights over Sossusvlei to catamaran cruises in Walvis Bay, ensuring you never miss out due to fully booked schedules.",
    features: [
      "National Park entry permits pre-arranged",
      "Booking for specialized activities (ballooning, boat tours)",
      "Restaurant reservations at top local dining spots",
      "Permits for restricted wilderness areas",
    ],
    image:
      "https://images.pexels.com/photos/28425179/pexels-photo-28425179.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Transfers & Shuttles",
    description:
      "Professional, punctual airport transfers and inter-city shuttles for individuals and large groups across the vast Namibian roads.",
    longDescription:
      "Start and end your journey in comfort. Our transfer services provide reliable, safe, and air-conditioned transport between airports, hotels, and major towns. Our professional drivers track your flight status to ensure they are waiting for you the moment you step out of the terminal.",
    features: [
      "Hosea Kutako International Airport meet-and-greet",
      "Private VIP transfers available",
      "Inter-city shuttle coordination",
      "Spacious vehicles with ample luggage capacity",
    ],
    image:
      "https://images.pexels.com/photos/30195938/pexels-photo-30195938.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Camping Equipment Hire",
    description:
      "High-quality rooftop tents, cooking kits, and camping essentials for the ultimate off-road experience.",
    longDescription:
      "Namibia is a camper's paradise. If you are renting a 4x4 or bringing your own, we supply top-tier camping equipment to keep you comfortable in the bush. From easy-to-use rooftop tents to comprehensive kitchen sets and heavy-duty sleeping bags, we provide everything you need for a comfortable night under the Milky Way.",
    features: [
      "Premium, weather-resistant rooftop tents",
      "Complete mobile kitchen and cutlery sets",
      "12V portable fridge/freezers",
      "Sturdy camping chairs and tables",
    ],
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21v-4m18 4v-4M3 10l9-7 9 7M4 10v11h16V10" />
      </svg>
    ),
  },
  {
    title: "Chauffeur Services",
    description:
      "Sit back and enjoy the horizon. Our professional drivers provide VIP transport with local insight.",
    longDescription:
      "For those who prefer to look at the scenery rather than the road, our VIP chauffeur services offer the ultimate luxury. Our highly trained, discreet, and knowledgeable drivers will navigate the Namibian terrain for you, turning travel days into relaxing sightseeing experiences.",
    features: [
      "Professional, defensive-driving trained chauffeurs",
      "Luxury SUV and customized 4x4 options",
      "Flexible, on-demand daily routing",
      "Deep local knowledge and route optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Transport & Logistics",
    description:
      "Comprehensive logistics for large groups, film crews, and complex expedition requirements.",
    longDescription:
      "Managing travel for large groups, specialized film crews, or corporate retreats requires military-level precision. Our logistics team handles complex multi-vehicle convoys, specialized gear transport, and synchronized scheduling across vast, remote distances to ensure your project or event runs flawlessly.",
    features: [
      "Film and documentary crew transport coordination",
      "Multi-vehicle convoy management",
      "Remote location catering and camp setup",
      "Customized logistical problem-solving",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

interface ServicesClientProps {
  sanityVideo?: { playbackId: string; poster: string } | null;
}

export default function ServicesClient({ sanityVideo }: ServicesClientProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const isAllShown = visibleCount >= allServices.length;

  const [expandedService, setExpandedService] = useState<string | null>(null);

  const loadMore = () => setVisibleCount(allServices.length);

  // Bring in your Lenis instance
  const lenis = useLenis();

  return (
    <main className="min-h-screen bg-white relative">
      {/* 1. HERO SECTION */}
      <section
        className="relative pt-35 pb-15 bg-gray-900 overflow-hidden"
        aria-label="Services Hero"
      >
        {/* OPTIMIZED: Added aria-hidden to decorative overlay */}
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          {/* THE FIX: Replaced native <video> with <MuxPlayer> */}
          {sanityVideo ? (
            <MuxPlayer
              playbackId={sanityVideo.playbackId}
              poster={sanityVideo.poster}
              muted
              autoPlay="muted"
              loop
              streamType="on-demand"
              minResolution="480p"
              maxResolution="1080p"
              style={{
                width: '100%',
                height: '100%',
                '--media-object-fit': 'cover',
                '--media-object-position': 'center 60%', 
                '--controls': 'none'
              } as React.CSSProperties}
            />
          ) : (
            // Fallback while loading or if no video is published
            <div className="w-full h-full bg-gray-900" />
          )}
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6">
            Our <span className="text-orange-500">Expertise</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            From logistics to adventure, we provide every tool needed to
            experience the true freedom of the Namibian landscape.
          </p>
        </div>
      </section>

      {/* 2. ALTERNATING SERVICES GRID */}
      <section className="py-15 px-6" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">
          List of Services
        </h2>
        <div className="container mx-auto lg:px-12">
          <div className="space-y-12 lg:space-y-20">
            {allServices.slice(0, visibleCount).map((service, index) => {
              const isExpanded = expandedService === service.title;

              return (
                <div
                  key={service.title}
                  id={`service-${index}`}
                  className="flex flex-col relative scroll-mt-24"
                >
                  {/* THE CARD */}
                  <article
                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                      index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    } relative z-10 bg-white`}
                  >
                    <div className="w-full lg:w-5/12 group overflow-hidden rounded-3xl shadow-xl aspect-video relative shrink-0">
                      <Image
                        src={service.image}
                        // OPTIMIZED: Added contextual brand name to dynamic alt text
                        alt={`Tuyeni Travel Service: ${service.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        loading="lazy"
                        unoptimized // THE FIX: Bypasses Next.js image optimization for external URLs
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div
                      className="w-full lg:w-7/12 space-y-4"
                      id={`service-content-${index}`}
                    >
                      <div
                        className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500"
                        aria-hidden="true"
                      >
                        {service.icon}
                      </div>

                      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                        {service.description}
                      </p>

                      <div className="pt-4 flex flex-wrap items-center gap-6">
                        <Link
                          href="/contact"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm md:text-base"
                          aria-label={`Enquire about ${service.title}`}
                        >
                          Enquire Now
                        </Link>

                        <button
                          onClick={() => {
                            const isClosing = isExpanded;
                            setExpandedService(
                              isClosing ? null : service.title,
                            );

                            if (!isClosing) {
                              setTimeout(() => {
                                const isMobile = window.innerWidth < 1024;

                                const targetId = isMobile
                                  ? `service-content-${index}`
                                  : `service-${index}`;
                                const element =
                                  document.getElementById(targetId);

                                if (element) {
                                  if (lenis) {
                                    const offsetValue = isMobile ? -50 : -50;
                                    lenis.scrollTo(element, {
                                      offset: offsetValue,
                                    });
                                  } else {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }
                              }, 400);
                            }
                          }}
                          className="text-gray-900 font-bold hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm md:text-base"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? "Show Less" : "Learn More"}
                          <span
                            className={`transition-transform duration-300 ${
                              isExpanded
                                ? "-rotate-90"
                                : "group-hover:translate-x-1"
                            }`}
                            aria-hidden="true"
                          >
                            {isExpanded ? "↑" : "→"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* THE EXPANDING CURTAIN */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    } relative z-0`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-8 pb-6 px-6 md:px-10 mt-4 bg-gray-50 border border-gray-100 rounded-3xl shadow-inner flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/2 space-y-3">
                          <h4 className="text-xl font-bold text-gray-900">
                            Service Details
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                            {service.longDescription}
                          </p>
                        </div>

                        <div className="w-full md:w-1/2 space-y-3">
                          <h4 className="text-lg font-bold text-gray-900">
                            What to Expect:
                          </h4>
                          <ul className="space-y-3" role="list">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-gray-700 font-medium text-sm md:text-base"
                              >
                                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                  {/* OPTIMIZED: Added aria-hidden to decorative checkmarks */}
                                  <svg
                                    className="w-3 h-3 text-orange-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                </div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isAllShown && (
            <div className="mt-24 text-center">
              <button
                onClick={loadMore}
                className="inline-block border-2 border-gray-900 text-gray-900 px-12 py-5 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95"
                aria-label="Load remaining services"
              >
                Explore More Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION */}
      <section
        className="py-24 bg-gray-50 border-t border-gray-100"
        aria-labelledby="value-heading"
      >
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2
            id="value-heading"
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-16"
          >
            Why Choose Tuyeni Travel?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-500">
                Local Knowledge
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                As locals, we don't just show you the map; we show you the
                hidden gems and secret trails unknown to standard agencies.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-500">
                Personalized Support
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                We are with you every step of the way, from the first planning
                session to the moment you fly back home.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-500">
                Sustainable Tourism
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                We prioritize eco-friendly lodges and respect local wildlife,
                ensuring Namibia stays pristine for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}