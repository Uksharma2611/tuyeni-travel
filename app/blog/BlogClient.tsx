"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import MuxPlayer from "@mux/mux-player-react";

const CATEGORIES = [
  "All",
  "Travel Tips",
  "Destination Highlights",
  "Seasonal Guides",
  "FAQs",
];

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
  serviceCta: { text: string; link: string };
}

interface BlogClientProps {
  sanityVideo?: { playbackId: string; poster: string } | null;
}

export default function BlogClient({ sanityVideo }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- PAGINATION STATE ---
  const [visibleCount, setVisibleCount] = useState(6);

  // --- MOBILE DROPDOWN STATE ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery]);
  // -----------------------------

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSocialShare = (
    platform: "facebook" | "whatsapp",
    slug: string,
    title: string,
  ) => {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://tuyenitravel.com";
    const url = encodeURIComponent(`${baseUrl}${slug}`);
    const text = encodeURIComponent(title);

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "width=600,height=400",
      );
    } else if (platform === "whatsapp") {
      window.open(
        `https://api.whatsapp.com/send?text=${text}%20${url}`,
        "_blank",
      );
    }
  };

  const handleNativeShare = async (
    slug: string,
    title: string,
    excerpt: string,
  ) => {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://tuyenitravel.com";
    const url = `${baseUrl}${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title}\n\n${excerpt}\n\nRead more at: ${url}`,
          url: url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      setNotification({
        message: "Link copied to clipboard!",
        type: "success",
      });
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await client.fetch(ALL_POSTS_QUERY);
        const formattedPosts = fetchedPosts.map((post: any) => ({
          ...post,
          date: post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recent",
          imageUrl:
            post.imageUrl ||
            "https://images.pexels.com/photos/3305542/pexels-photo-3305542.jpeg?auto=compress&cs=tinysrgb&w=800",
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const FEATURED_POST = posts.length > 0 ? posts[0] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-orange-500 font-bold text-xl animate-pulse">
          Loading Tuyeni Journals...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 relative">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative pt-35 pb-15 bg-gray-900 overflow-hidden"
        aria-label="Blog Hero"
      >
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          {sanityVideo ? (
            <MuxPlayer
              playbackId={sanityVideo.playbackId}
              poster={sanityVideo.poster} 
              muted
              autoPlay="muted"
              loop
              streamType="on-demand"
              minResolution="480p"
              style={{
                width: '100%',
                height: '100%',
                '--media-object-fit': 'cover',
                '--media-object-position': 'center 20%', 
                '--controls': 'none'
              } as React.CSSProperties}
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Trip <span className="text-orange-500">Journals</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            Stories, expert tips, and inspiration from the heart of Namibia and
            beyond. Let your imagination wander before your feet do.
          </p>
        </div>
      </section>

      {/* 2. MAIN BLOG CONTENT */}
      <section
        className="py-15 pb-24 relative overflow-hidden"
        aria-label="Blog Articles"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div
            id="blog-main-card"
            className="w-full mt-1" 
          >
            
            {/* SEARCH & CATEGORY FILTERS */}
            <div className="mb-12 border-b border-gray-200 pb-8 pt-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* SEARCH BAR */}
                <div className="relative w-full lg:w-72 shrink-0 z-10">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    aria-label="Search articles"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium shadow-sm"
                  />
                </div>

                {/* DESKTOP CATEGORY BUTTONS */}
                <div className="hidden md:flex flex-wrap gap-2 md:gap-3" role="group" aria-label="Article Categories">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      aria-pressed={activeCategory === cat}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                        activeCategory === cat
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* MOBILE CATEGORY DROPDOWN */}
                <div className="block md:hidden w-full relative z-30">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-5 py-3.5 bg-white border ${
                      isDropdownOpen 
                        ? "border-orange-500 ring-1 ring-orange-500" 
                        : "border-gray-200"
                    } rounded-full flex justify-between items-center transition-all text-sm font-bold text-gray-900 shadow-sm cursor-pointer`}
                  >
                    <span>{activeCategory}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu List */}
                  <div
                    className={`absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-2 transform origin-top transition-all duration-300 ease-out ${
                      isDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-3 invisible pointer-events-none"
                    }`}
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          handleCategoryClick(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                          activeCategory === cat
                            ? "bg-[#B3E5FC] text-gray-900 font-bold"
                            : "text-gray-700 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>

            {/* --- FEATURED POST --- */}
            {activeCategory === "All" && !searchQuery && FEATURED_POST && !isLoading && (
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-orange-500"></div>
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">
                      Featured Story
                    </h2>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 text-gray-400">
                    <span className="text-sm font-bold uppercase tracking-wider mr-2">
                      Share:
                    </span>
                    <button
                      aria-label="Share on Facebook"
                      onClick={() =>
                        handleSocialShare(
                          "facebook",
                          FEATURED_POST.slug,
                          FEATURED_POST.title,
                        )
                      }
                      className="hover:text-[#1877F2] transition-colors"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>
                    <button
                      aria-label="Share on WhatsApp"
                      onClick={() =>
                        handleSocialShare(
                          "whatsapp",
                          FEATURED_POST.slug,
                          FEATURED_POST.title,
                        )
                      }
                      className="hover:text-[#25D366] transition-colors"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.658.85 5.127 2.308 7.156L.626 24l5.006-1.583A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zM18.15 17.27c-.266.75-1.554 1.442-2.146 1.512-.591.07-1.341.168-3.791-.795-2.956-1.162-4.832-4.184-4.978-4.38-.146-.196-1.189-1.583-1.189-3.02 0-1.437.75-2.146 1.015-2.428.266-.282.576-.352.766-.352.19 0 .38.003.551.011.181.008.423-.07.662.505.24.576.819 2.003.89 2.146.071.144.118.312.023.504-.095.193-.146.312-.288.479-.142.167-.297.362-.423.491-.141.143-.292.298-.128.583.164.285.731 1.209 1.564 1.956 1.078.966 1.983 1.267 2.27 1.41.287.143.454.118.625-.07.172-.188.74-.863.938-1.16.198-.297.396-.247.658-.15.262.097 1.656.782 1.938.923.282.141.47.234.538.365.068.13.068.752-.198 1.502z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <Link
                    href={FEATURED_POST.slug}
                    className="relative h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-lg group block"
                  >
                    <Image
                      src={FEATURED_POST.imageUrl}
                      alt={FEATURED_POST.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized 
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-orange-600 shadow-sm">
                      {FEATURED_POST.category}
                    </div>
                  </Link>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mb-4">
                      <time>{FEATURED_POST.date}</time>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" aria-hidden="true"></span>
                      <span>{FEATURED_POST.readTime || "5 min read"}</span>
                    </div>
                    <Link href={FEATURED_POST.slug} className="group">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-orange-500 transition-colors leading-tight">
                        {FEATURED_POST.title}
                      </h3>
                    </Link>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {FEATURED_POST.excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <Link
                        href={FEATURED_POST.slug}
                        className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-4 transition-all"
                      >
                        Read Full Story{" "}
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                      {FEATURED_POST.serviceCta && (
                        <>
                          <span className="hidden sm:block text-gray-300" aria-hidden="true">
                            |
                          </span>
                          <Link
                            href={FEATURED_POST.serviceCta.link || "/services"}
                            className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-4"
                          >
                            {FEATURED_POST.serviceCta.text || "View Services"}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- RECENT POSTS GRID --- */}
            <div>
              {isLoading ? (
                <div className="text-center py-32">
                  <div className="inline-flex items-center gap-3 bg-orange-50 px-6 py-3 rounded-full text-orange-500 font-bold animate-pulse shadow-sm border border-orange-100">
                    <svg className="animate-spin h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Tuyeni Journals...
                  </div>
                </div>
              ) : visiblePosts.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or category filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      handleCategoryClick("All");
                    }}
                    className="mt-6 text-orange-500 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visiblePosts.map((post) => (
                      <div
                        key={post.id}
                        className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-orange-200 transition-all hover:shadow-xl hover:-translate-y-1"
                      >
                        <Link
                          href={post.slug}
                          className="relative h-60 overflow-hidden block"
                        >
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized 
                          />
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                            {post.category}
                          </div>
                        </Link>
                        <div className="p-8 flex flex-col flex-grow bg-white">
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4">
                            <time>{post.date}</time>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true"></span>
                            <span>{post.readTime || "5 min read"}</span>
                          </div>
                          <Link href={post.slug} className="mb-3 block">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col gap-4">
                            {post.serviceCta && (
                              <Link
                                href={post.serviceCta.link || "/services"}
                                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-fit"
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
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                                {post.serviceCta.text || "View Services"}
                              </Link>
                            )}
                            <div className="flex items-center justify-between">
                              <Link
                                href={post.slug}
                                className="text-orange-500 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                              >
                                Read Article{" "}
                                <span className="text-lg leading-none" aria-hidden="true">→</span>
                              </Link>
                              <div className="flex gap-2">
                                <button
                                  aria-label="Share Article"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNativeShare(
                                      post.slug,
                                      post.title,
                                      post.excerpt,
                                    );
                                  }}
                                  className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 fill-current"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* --- NEW: LOAD MORE BUTTON --- */}
                  {visibleCount < filteredPosts.length && (
                    <div className="mt-16 flex justify-center">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm active:scale-95"
                      >
                        Load More Journals
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* --- NEWSLETTER CTA --- */}
            <div className="mt-24 relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl">
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Want more travel inspiration?
                </h3>
                <p className="text-gray-300 mb-10 max-w-lg mx-auto text-lg">
                  Join our newsletter to get the latest Namibian travel guides,
                  hidden gems, and exclusive offers delivered directly to your
                  inbox.
                </p>
                <form
                  className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setIsSubmitting(true);

                    const form = e.target as HTMLFormElement;
                    const emailInput = form.elements[0] as HTMLInputElement;
                    const email = emailInput.value;

                    try {
                      const res = await fetch("/api/subscribe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });

                      const data = await res.json();

                      if (res.ok) {
                        setNotification({
                          message:
                            data.message === "Already subscribed!"
                              ? "You are already on the list! Welcome back."
                              : "Welcome aboard! Check your email for a confirmation.",
                          type: "success",
                        });
                        emailInput.value = "";
                      } else {
                        setNotification({
                          message: "Something went wrong. Please try again.",
                          type: "error",
                        });
                      }
                    } catch (err) {
                      setNotification({
                        message: "Network error. Please try again later.",
                        type: "error",
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <input
                    type="email"
                    aria-label="Email address for newsletter"
                    placeholder="Enter your email address"
                    className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 backdrop-blur-md transition-all disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-orange-500/30 whitespace-nowrap disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
                      "Subscribe"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          notification
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        }`}
        role="alert"
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
              aria-label="Close notification"
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
    </main>
  );
}