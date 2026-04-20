"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Internal component to handle the reset logic
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Whenever the pathname changes, tell Lenis to jump to the top
    // 'immediate: true' prevents the user from seeing a long scroll animation up
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // OPTIMIZED: Prevent Next.js and the browser from fighting with Lenis over scroll position.
    // This eliminates scroll "jumps" or jank when users hit the back/forward browser buttons.
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: false,
        syncTouch: false,
      }}
    >
      {/* This component sits inside the provider and watches for route changes */}
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}