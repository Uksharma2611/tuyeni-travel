"use client";

import Image from "next/image";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";

interface AboutClientProps {
  sanityVideo?: { playbackId: string; poster: string } | null;
}

export default function AboutClient({ sanityVideo }: AboutClientProps) {
  return (
    <main className="min-h-screen bg-white relative">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative pt-35 pb-9 bg-gray-900 overflow-hidden"
        aria-label="About Us Hero"
      >
        {/* OPTIMIZED: Added aria-hidden to decorative background container */}
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          
          {/* THE FIX: Added scale-[1.25] for mobile zoom, resetting to scale-100 on desktop */}
          {sanityVideo ? (
            <MuxPlayer
              playbackId={sanityVideo.playbackId}
              poster={sanityVideo.poster}
              muted
              autoPlay="muted"
              loop
              playsInline
              streamType="on-demand"
              minResolution="480p"
              className="absolute inset-0 w-full h-full object-cover scale-[1.25] sm:scale-100 origin-center transition-transform duration-500" 
              style={{
                '--media-object-fit': 'cover',
                '--media-object-position': 'center', 
                '--controls': 'none',
                minHeight: '100%',
                minWidth: '100%'
              } as React.CSSProperties}
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Experience <span className="text-orange-500">Freedom</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            Whether you're chasing sunrises in Namibia, exploring the streets of
            Rome, or escaping for a quiet retreat, Tuyeni helps you experience
            freedom, your way.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section
        className="py-15 px-6"
        aria-label="Company Details"
      >
        <div className="container mx-auto lg:px-12">
          <div className="space-y-16 lg:space-y-24 mt-7">

            {/* The Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Story
                </h3>
                <p>
                  Tuyeni Travel was founded in 2016 from a deep love for
                  storytelling, movement, and meaningful connection.{" "}
                  <strong>Tuyeni, meaning "Let’s Go"</strong>, reflects our
                  belief that travel is more than a journey across land or sea;
                  it’s a journey inward, to discover something new about the
                  world and about yourself.
                </p>
                <p>
                  From our base in Windhoek, Namibia, we serve clients from all
                  walks of life, both local and international, by designing
                  experiences that are seamless, soulful, and unforgettable.
                  Whether you're travelling solo, with family, or in a group,
                  our dedicated team of consultants is here to bring your travel
                  vision to life.
                </p>
                <p>
                  We pride ourselves not only on what we do, but how we do it;
                  with warmth, care, and creativity. Our long-standing
                  relationships with trusted partners across the globe ensure
                  that every detail is thoughtfully arranged, from flights and
                  accommodations to custom itineraries, self-drive tours, and
                  corporate travel solutions.
                </p>
              </div>

              <div className="relative h-[550px] rounded-[2rem] overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/20324831/pexels-photo-20324831.jpeg?auto=compress&cs=tinysrgb&w=2000"
                  alt="Travelers enjoying a seamless Tuyeni Travel experience in Namibia" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy" 
                  unoptimized 
                />
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-orange-200 transition-colors">
                <div
                  className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500 mb-6"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  To craft personalized, seamless travel experiences that
                  connect people to the soul of Namibia and beyond; with
                  integrity, care, and a passion for storytelling.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-orange-200 transition-colors">
                <div
                  className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500 mb-6"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  To become Southern Africa’s most trusted and inspiring travel
                  companion where every trip starts with curiosity and ends with
                  lifelong memories.
                </p>
              </div>

              {/* Values */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-orange-200 transition-colors flex flex-col">
                <div
                  className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500 mb-6"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Values
                </h4>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-2">
                  {[
                    "Integrity",
                    "Warmth",
                    "Excellence",
                    "Innovation",
                    "Local Pride",
                    "Sustainability",
                  ].map((value) => (
                    <li
                      key={value}
                      className="flex items-center gap-3 text-gray-700 font-medium"
                    >
                      <div
                        className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3 h-3 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certifications & CTA Row */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gray-900 rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl"
                aria-hidden="true"
              ></div>

              {/* Certification Badge */}
              <div className="relative z-10 flex items-center gap-6 bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/10 w-full lg:w-auto">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <Image
                    src="/assets/logo.svg"
                    alt="Tuyeni Travel Logo"
                    width={32}
                    height={32}
                    style={{ height: "auto" }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Registered With
                  </p>
                  <p className="text-xl font-bold text-white">
                    Namibia Tourism Board
                  </p>
                  <p className="text-orange-400 font-medium mt-1">
                    Reg. No. BOO01067
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="relative z-10 w-full lg:w-auto text-center lg:text-right">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to start your journey?
                </h3>
                <Link
                  href="/contact"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all active:scale-95 text-lg"
                  aria-label="Navigate to contact page to plan your trip"
                >
                  Plan Your Trip Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}