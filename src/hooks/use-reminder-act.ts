"use client";

import { useEffect, useState } from "react";

export type ReminderPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** مثل مرحله ۵ → pan چپ → کوچک گالری → badge → ۲ثانیه → موس → کلیک → موبایل */
const SCHEDULE_MS = [600, 1400, 2400, 4400, 5200, 6000] as const;

export function useReminderAct(active: boolean) {
  const [phase, setPhase] = useState<ReminderPhase>(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const timers = SCHEDULE_MS.map((ms, i) =>
      window.setTimeout(() => setPhase((i + 1) as ReminderPhase), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return {
    phase,
    panX: phase >= 1 ? 0.18 : 0.5,
    showGallery: true,
    galleryScale: phase >= 2 ? 0.58 : 1,
    showBadge: phase >= 3 && phase < 5,
    badgeDismissing: phase >= 5 && phase < 6,
    showCursor: phase >= 4 && phase < 6,
    cursorClick: phase >= 5,
    showPhone: phase >= 6,
  };
}
