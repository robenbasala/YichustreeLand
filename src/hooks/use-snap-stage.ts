"use client";

import { RefObject, useCallback, useEffect, useState } from "react";
import { SNAP_CHAPTERS } from "@/lib/snap-chapters";

export function useSnapStage(scrollRef: RefObject<HTMLElement | null>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToStage = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const section = el.querySelector(`[data-snap-index="${index}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [scrollRef]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const sections = root.querySelectorAll("[data-snap-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        let best = 0;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-snap-index"));
          if (Number.isNaN(idx)) return;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = idx;
          }
        });
        if (bestRatio > 0.4) {
          setActiveIndex((prev) => (prev !== best ? best : prev));
        }
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [scrollRef]);

  const storyIndex = Math.min(activeIndex, SNAP_CHAPTERS.length - 1);
  const chapter = SNAP_CHAPTERS[storyIndex] ?? SNAP_CHAPTERS[0];

  return {
    activeIndex,
    chapter,
    scrollToStage,
    total: SNAP_CHAPTERS.length,
    onStory: activeIndex < SNAP_CHAPTERS.length,
  };
}
