"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TreePine } from "lucide-react";
import { SNAP_CHAPTERS } from "@/lib/snap-chapters";
import { useSnapStage } from "@/hooks/use-snap-stage";
import { SnapTree } from "./SnapTree";
import { SnapChapterText } from "./SnapChapterText";
import { SnapTimeline } from "./SnapTimeline";
import { CTASection } from "./CTASection";
import { FloatingLeaves } from "./FloatingLeaves";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeIndex, chapter } = useSnapStage(scrollRef);

  return (
    <main className="relative bg-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-10">
        <motion.div className="flex items-center gap-2.5 rounded-full border border-forest-100/80 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <motion.div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600 text-white">
            <TreePine className="h-4 w-4" />
          </motion.div>
          <span className="font-display text-lg font-semibold text-forest-900">Lineage</span>
        </motion.div>
        <Button variant="secondary" size="sm" className="hidden bg-white/80 backdrop-blur-md sm:inline-flex">
          Sign In
        </Button>
      </header>

      <SnapTimeline activeIndex={activeIndex} scrollRef={scrollRef} />

      <div
        ref={scrollRef}
        className="snap-page relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
      >
        {SNAP_CHAPTERS.map((ch, i) => (
          <section
            key={ch.id}
            data-snap-index={i}
            className="h-screen min-h-screen w-full shrink-0 snap-start snap-always"
            aria-hidden
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 flex flex-col pt-20 pb-8">
        <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:gap-4 lg:px-6 xl:px-10">
          <div className="pointer-events-auto z-30 flex shrink-0 justify-center px-4 lg:w-[36%] lg:justify-start lg:px-0">
            <SnapChapterText chapter={chapter} isHero={activeIndex === 0} />
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-x-auto lg:overflow-visible">
            <SnapTree chapter={chapter} />
          </div>
        </div>

        <p className="text-center text-[11px] font-medium text-forest-400">
          Scroll — step {activeIndex + 1} of {SNAP_CHAPTERS.length}
        </p>
      </div>

      <div className="relative z-10 bg-white">
        <CTASection />
        <footer className="border-t border-forest-100 px-6 py-8 text-center text-sm text-forest-500">
          <p>© {new Date().getFullYear()} Lineage — Preserve your Jewish family story.</p>
        </footer>
      </div>

      <FloatingLeaves count={6} className="pointer-events-none fixed inset-0 z-0 opacity-30" />
    </main>
  );
}
