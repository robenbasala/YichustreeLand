"use client";

import { useEffect, useState } from "react";

export type PhotosPhase = 0 | 1;

/** مثل مرحله ۴ → بعد pan راست → گالری */
const PAN_MS = 750;

export function usePhotosAct(active: boolean) {
  const [phase, setPhase] = useState<PhotosPhase>(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const timer = window.setTimeout(() => setPhase(1), PAN_MS);
    return () => clearTimeout(timer);
  }, [active]);

  return {
    phase,
    panX: phase >= 1 ? 0.5 : 0,
    showGallery: phase >= 1,
  };
}
