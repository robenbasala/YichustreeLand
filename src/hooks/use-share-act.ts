"use client";

import { useEffect, useState } from "react";

export type SharePhase = 0 | 1 | 2 | 3 | 4 | 5;

/** 1s request → 3s → موس 1s روی Confirm → کلیک → درخت مهمان */
const SCHEDULE_MS = [1000, 4000, 5000, 5200, 6000] as const;

export function useShareAct(active: boolean) {
  const [phase, setPhase] = useState<SharePhase>(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const timers = SCHEDULE_MS.map((ms, i) =>
      window.setTimeout(() => setPhase((i + 1) as SharePhase), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return {
    phase,
    panX: phase >= 5 ? -0.14 : phase >= 1 ? -0.11 : -0.08,
    mainTreeScale: 0.75,
    mainTreeShiftX: -150,
    treeScaleMult: 1,
    showRequest: phase >= 1 && phase < 5,
    showCursor: phase >= 2 && phase < 4,
    cursorClick: phase >= 3 && phase < 4,
    confirmPressed: phase >= 3,
    lightGreen: phase >= 4,
    dimMainTree: phase >= 4,
    showGuestTree: phase >= 5,
    highlightSarah: phase >= 1,
  };
}
