"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { TreeLine } from "@/lib/tree-layout";

interface SnapTreeLineProps {
  line: TreeLine;
  /** Play stroke-draw animation (only for lines new at current stage) */
  animate?: boolean;
  delay?: number;
  onComplete?: () => void;
}

export function SnapTreeLine({
  line,
  animate = false,
  delay = 0,
  onComplete,
}: SnapTreeLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(!animate);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    if (len <= 0) return;

    if (!animate) {
      el.style.strokeDasharray = "none";
      el.style.strokeDashoffset = "0";
      el.style.transition = "none";
      setVisible(true);
      onComplete?.();
      return;
    }

    el.style.strokeDasharray = `${len}`;
    setVisible(true);
    el.style.transition = "none";
    el.style.strokeDashoffset = `${len}`;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `stroke-dashoffset 0.72s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
        el.style.strokeDashoffset = "0";
      });
    });

    const timer = window.setTimeout(() => {
      el.style.strokeDasharray = "none";
      el.style.strokeDashoffset = "0";
      onComplete?.();
    }, delay * 1000 + 780);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [line.d, animate, delay, onComplete]);

  return (
    <path
      ref={pathRef}
      d={line.d}
      fill="none"
      stroke="#2eb8b8"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth={line.strokeWidth ?? 2.5}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
