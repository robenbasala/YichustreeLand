"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SNAP_CHAPTERS } from "@/lib/snap-chapters";
import { SiteNavbar } from "./SiteNavbar";
import { useSnapStage } from "@/hooks/use-snap-stage";
import { usePhotosAct } from "@/hooks/use-photos-act";
import { useReminderAct } from "@/hooks/use-reminder-act";
import { useShareAct } from "@/hooks/use-share-act";
import { SnapTree } from "./SnapTree";
import { SnapChapterText } from "./SnapChapterText";
import { SnapTimeline } from "./SnapTimeline";
import { AppointmentSection } from "./AppointmentSection";
import { FloatingLeaves } from "./FloatingLeaves";

/** Full-screen snap after story step 7 (share) — appointment calendar */
export const APPOINTMENT_SNAP_INDEX = SNAP_CHAPTERS.length;

export function LandingPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeIndex, chapter } = useSnapStage(scrollRef);
  const [treeMounted, setTreeMounted] = useState(false);

  useEffect(() => {
    if (activeIndex >= 1) setTreeMounted(true);
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#appointment") return;
    const scrollToAppointment = () => {
      const section = scrollRef.current?.querySelector(
        `[data-snap-index="${APPOINTMENT_SNAP_INDEX}"]`,
      );
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    requestAnimationFrame(() => requestAnimationFrame(scrollToAppointment));
  }, []);

  const isHeroLayout = activeIndex === 0;
  const onStory = activeIndex < SNAP_CHAPTERS.length;
  const showTree = activeIndex >= 1 && onStory;
  const showOverlay = onStory;
  const isPhotos = activeIndex === 4;
  const isReminders = activeIndex === 5;
  const isShare = activeIndex === 6;
  const photosDrive = usePhotosAct(isPhotos && showOverlay);
  const reminderDrive = useReminderAct(isReminders && showOverlay);
  const shareDrive = useShareAct(isShare && showOverlay);

  return (
    <main id="login" className="relative h-screen overflow-hidden bg-white">
      <SiteNavbar />

      {onStory && (
        <SnapTimeline activeIndex={activeIndex} scrollRef={scrollRef} />
      )}

      <div
        ref={scrollRef}
        className="snap-page h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      >
        {SNAP_CHAPTERS.map((ch, i) => (
          <section
            key={ch.id}
            data-snap-index={i}
            className="h-screen min-h-screen w-full shrink-0 snap-start snap-always"
          />
        ))}

        <section
          data-snap-index={APPOINTMENT_SNAP_INDEX}
          className="h-screen min-h-screen w-full shrink-0 snap-start snap-always"
        >
          <AppointmentSection />
        </section>
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="snap-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none fixed inset-0 z-20 flex flex-col overflow-hidden pt-[5.25rem] pb-8"
          >
            <div
              className={`flex min-h-0 flex-1 flex-col px-4 lg:px-8 xl:px-12 ${
                isHeroLayout
                  ? "items-center justify-center"
                  : "lg:flex-row lg:items-center lg:gap-10"
              }`}
            >
              <div
                className={`pointer-events-auto z-30 shrink-0 ${
                  isHeroLayout
                    ? "mx-auto w-full max-w-2xl text-center lg:text-left"
                    : "lg:w-[36%] lg:max-w-md"
                }`}
              >
                <SnapChapterText chapter={chapter} isHero={isHeroLayout} />
              </div>

              {treeMounted && showTree && (
                <div
                  className={`pointer-events-auto relative z-10 mt-6 flex min-h-0 min-w-0 flex-1 items-center justify-center lg:mt-0 ${
                    isPhotos || isReminders || isShare
                      ? "overflow-visible"
                      : "overflow-hidden"
                  }`}
                >
                  <SnapTree
                    chapter={chapter}
                    photosDrive={isPhotos ? photosDrive : undefined}
                    reminderDrive={isReminders ? reminderDrive : undefined}
                    shareDrive={isShare ? shareDrive : undefined}
                  />
                </div>
              )}
            </div>

            <p className="mt-2 shrink-0 text-center text-[11px] font-medium text-forest-400">
              {activeIndex === SNAP_CHAPTERS.length - 1 ? (
                <>
                  Step {activeIndex + 1} of {SNAP_CHAPTERS.length} — scroll down
                  to book an appointment
                </>
              ) : (
                <>
                  Scroll — step {activeIndex + 1} of {SNAP_CHAPTERS.length}
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingLeaves
        count={6}
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
      />
    </main>
  );
}
