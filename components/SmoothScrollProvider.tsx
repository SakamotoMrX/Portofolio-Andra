"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.5,
      smoothWheel: true,
      syncTouch: true,
      anchors: { offset: -64 },
    });
    lenisRef.current = lenis;

    lenis.start();

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}