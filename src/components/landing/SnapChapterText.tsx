"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SnapChapter } from "@/lib/snap-chapters";

interface SnapChapterTextProps {
  chapter: SnapChapter;
  isHero?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

function renderSubtitle(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-forest-800">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function SnapChapterText({ chapter, isHero }: SnapChapterTextProps) {
  return (
    <motion.div
      key={chapter.id}
      initial={{ opacity: 0.35, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className={
        isHero
          ? "relative max-w-xl text-center lg:text-left"
          : "relative max-w-md rounded-2xl border border-forest-100/80 bg-white/85 p-6 shadow-card backdrop-blur-md lg:max-w-lg lg:p-8"
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
        {renderSubtitle(chapter.subtitle)}
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
  );
}
