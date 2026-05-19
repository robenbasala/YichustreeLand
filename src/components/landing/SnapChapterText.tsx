"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SnapChapter } from "@/lib/snap-chapters";

interface SnapChapterTextProps {
  chapter: SnapChapter;
  isHero?: boolean;
}

export function SnapChapterText({ chapter, isHero }: SnapChapterTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.id}
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={
          isHero
            ? "max-w-xl text-center lg:text-left"
            : "max-w-md rounded-2xl border border-forest-100/80 bg-white/85 p-6 shadow-card backdrop-blur-md lg:max-w-lg lg:p-8"
        }
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-forest-500">
          {chapter.label}
        </span>
        <h2
          className={
            isHero
              ? "mt-3 font-display text-3xl font-bold leading-tight text-forest-950 sm:text-4xl lg:text-5xl"
              : "mt-2 font-display text-2xl font-bold leading-tight text-forest-950 sm:text-3xl"
          }
        >
          {chapter.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-forest-600 lg:text-lg">
          {chapter.subtitle}
        </p>
        {isHero && (
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button size="lg" className="shadow-glow">
              Start Your Tree
            </Button>
            <Button variant="secondary" size="lg">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
