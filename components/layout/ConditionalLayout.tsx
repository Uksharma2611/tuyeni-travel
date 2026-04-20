"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  // If we are in the Sanity Studio, don't render ANY website components.
  // This stops the infinite reloading/scrolling loop immediately.
  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Header />
      {/* OPTIMIZED: Removed the redundant <main> wrapper to prevent invalid nested <main> tags. 
          Your individual page components already define their own <main> landmarks! */}
      {children}
      <Footer />
      <ScrollToTop />
      <CookieBanner />
    </SmoothScroll>
  );
}