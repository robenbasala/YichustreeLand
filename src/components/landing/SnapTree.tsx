"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SnapChapter } from "@/lib/snap-chapters";
import {
  TREE_MEMBERS,
  TREE_EVENTS,
  BAR_MITZVAH_GALLERY,
  getGuestTreeMembers,
  linesAtStage,
  getEventLayout,
  getGalleryLayout,
  getMoshehBadgePosition,
  getMoshehPhonePosition,
  getGuestTreeLines,
  getSarahGuestConnector,
  getSarahConnectRequestPosition,
  VIEWBOX,
} from "@/lib/tree-layout";
import { SnapConnectRequest } from "./SnapConnectRequest";
import type { usePhotosAct } from "@/hooks/use-photos-act";
import type { useReminderAct } from "@/hooks/use-reminder-act";
import type { useShareAct } from "@/hooks/use-share-act";
import { SnapTreeLine } from "./SnapTreeLine";
import { SnapPersonNode } from "./SnapPersonNode";
import { SnapEventGroup } from "./SnapEventGroup";
import { SnapEventGallery } from "./SnapEventGallery";
import { SnapBirthdayBadge, BIRTHDAY_BADGE } from "./SnapBirthdayBadge";
import { SnapReminderPhone } from "./SnapReminderPhone";
import { SnapReminderCursor } from "./SnapReminderCursor";
import { cn } from "@/lib/utils";

type PhotosDrive = ReturnType<typeof usePhotosAct>;
type ReminderDrive = ReturnType<typeof useReminderAct>;
type ShareDrive = ReturnType<typeof useShareAct>;

interface SnapTreeProps {
  chapter: SnapChapter;
  photosDrive?: PhotosDrive;
  reminderDrive?: ReminderDrive;
  shareDrive?: ShareDrive;
  className?: string;
}

export function SnapTree({
  chapter,
  photosDrive,
  reminderDrive,
  shareDrive,
  className,
}: SnapTreeProps) {
  const stage = chapter.treeStage;
  const genScale = chapter.genScale;
  const seenMembersRef = useRef<Set<string>>(new Set());
  const drawnLinesRef = useRef<Set<string>>(new Set());
  const seenEventsRef = useRef<Set<string>>(new Set());
  const seenGalleryRef = useRef(false);
  const seenGuestMembersRef = useRef<Set<string>>(new Set());
  const drawnGuestRef = useRef<Set<string>>(new Set());

  const [maxStage, setMaxStage] = useState(stage);
  useEffect(() => {
    setMaxStage((s) => Math.max(s, stage));
  }, [stage]);

  if (stage < 1) return null;

  const members = TREE_MEMBERS.filter((m) => m.fromStage <= maxStage);
  const lines = linesAtStage(maxStage, genScale);

  const stageLineOrder = lines
    .filter((l) => l.fromStage === stage)
    .sort((a, b) => a.row - b.row || a.animOrder - b.animOrder);

  const activeSet = chapter.activeMemberIds
    ? new Set(chapter.activeMemberIds)
    : null;

  const galleryEvent = chapter.showGalleryForEvent
    ? TREE_EVENTS.find((e) => e.id === chapter.showGalleryForEvent)
    : undefined;
  const galleryMember = galleryEvent
    ? TREE_MEMBERS.find((m) => m.id === galleryEvent.memberId)
    : undefined;
  const galleryLayout =
    galleryEvent && galleryMember
      ? getGalleryLayout(getEventLayout(galleryMember, galleryEvent, genScale))
      : null;

  const panX =
    shareDrive?.panX ??
    reminderDrive?.panX ??
    photosDrive?.panX ??
    chapter.treePanX ??
    0;
  const galleryScale = reminderDrive?.galleryScale ?? 1;
  const showGallery =
    Boolean(galleryLayout) &&
    (photosDrive ? photosDrive.showGallery : true);
  const treeScale =
    chapter.treeScale * (shareDrive?.treeScaleMult ?? 1);
  const badgePos = getMoshehBadgePosition(genScale);
  const phonePos = getMoshehPhonePosition(genScale);
  const sarahShiftX = shareDrive?.mainTreeShiftX ?? 0;

  const guestMembers = shareDrive?.showGuestTree
    ? getGuestTreeMembers(genScale, sarahShiftX)
    : [];
  const guestLines = shareDrive?.showGuestTree
    ? getGuestTreeLines(genScale, sarahShiftX)
    : [];
  const sarahConnector = getSarahGuestConnector(
    genScale,
    shareDrive ? sarahShiftX : 0,
  );
  const requestPos = getSarahConnectRequestPosition(genScale, sarahShiftX);
  const highlightSarah =
    shareDrive?.highlightSarah ?? chapter.selectedMemberId === "sarah";
  const dimMain = shareDrive?.dimMainTree ?? false;
  const isShare = Boolean(chapter.shareAct && shareDrive);
  const sarahMember = TREE_MEMBERS.find((m) => m.id === "sarah");
  const mainTreeShiftX = sarahShiftX;
  const mainTreeScale = shareDrive?.mainTreeScale ?? 1;
  const mainTreeTransform =
    isShare && sarahMember && shareDrive
      ? `translate(${sarahMember.x + mainTreeShiftX} ${sarahMember.y}) scale(${mainTreeScale}) translate(${-sarahMember.x} ${-sarahMember.y})`
      : undefined;

  return (
    <motion.div
      className={cn("relative w-full", className)}
      initial={isShare ? { y: -36, opacity: 0.92 } : false}
      animate={{
        y: 0,
        opacity: 1,
        scale: treeScale,
        x: panX ? `${panX * 100}%` : 0,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformOrigin:
          reminderDrive || photosDrive || shareDrive
            ? "left top"
            : "center top",
      }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        className="mx-auto block h-auto w-full min-w-[min(100%,850px)] max-w-[1500px] max-h-[min(72vh,780px)] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
        role="img"
        aria-label="Family tree"
      >
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5ebeb" />
            <stop offset="50%" stopColor="#2eb8b8" />
            <stop offset="100%" stopColor="#6dd9d9" />
          </linearGradient>
        </defs>

        <g
          className="main-tree"
          transform={mainTreeTransform}
          style={{
            opacity: dimMain ? 0.5 : 1,
            transition: "opacity 0.55s ease, transform 0.7s ease",
          }}
        >
          <g className="tree-members">
            {members.map((member) => {
              const memberScale = genScale[member.generation] ?? 1;
              const isNew = !seenMembersRef.current.has(member.id);

              return (
                <SnapPersonNode
                  key={member.id}
                  member={member}
                  isNew={isNew}
                  isHighlighted={
                    highlightSarah
                      ? member.id === "sarah"
                      : chapter.selectedMemberId === member.id
                  }
                  isDimmed={
                    activeSet !== null
                      ? !activeSet.has(member.id)
                      : shareDrive?.showRequest && !dimMain
                        ? member.id !== "sarah"
                        : false
                  }
                  scale={memberScale}
                  animOrder={member.animOrder}
                  onSeen={() => seenMembersRef.current.add(member.id)}
                />
              );
            })}
          </g>

          <g className="tree-lines">
            {lines.map((line) => {
            const shouldAnimate =
              line.fromStage === stage && !drawnLinesRef.current.has(line.id);
            const orderIdx = stageLineOrder.findIndex((l) => l.id === line.id);
            const delay = orderIdx >= 0 ? orderIdx * 0.14 : 0;

            return (
              <SnapTreeLine
                key={line.id}
                line={line}
                animate={shouldAnimate}
                delay={delay}
                onComplete={() => drawnLinesRef.current.add(line.id)}
              />
            );
          })}
          </g>
        </g>

        {shareDrive?.showGuestTree && (
          <>
            <g className="guest-tree-lines">
              <SnapTreeLine
                key={sarahConnector.id}
                line={sarahConnector}
                animate={!drawnGuestRef.current.has(sarahConnector.id)}
                delay={0}
                onComplete={() => drawnGuestRef.current.add(sarahConnector.id)}
              />
              {guestLines.map((line, i) => {
                const shouldAnimate = !drawnGuestRef.current.has(line.id);
                return (
                  <SnapTreeLine
                    key={line.id}
                    line={line}
                    animate={shouldAnimate}
                    delay={0.15 + i * 0.12}
                    onComplete={() => drawnGuestRef.current.add(line.id)}
                  />
                );
              })}
            </g>
            <g className="guest-tree-members">
              {guestMembers.map((member) => {
                const memberScale = (genScale[member.generation] ?? 1) * 0.85;
                const isNew = !seenGuestMembersRef.current.has(member.id);
                return (
                  <SnapPersonNode
                    key={member.id}
                    member={member}
                    isNew={isNew}
                    showPhotos={false}
                    scale={memberScale}
                    animOrder={member.animOrder}
                    onSeen={() => seenGuestMembersRef.current.add(member.id)}
                  />
                );
              })}
            </g>
          </>
        )}

        {chapter.showEvents && (
          <g className="tree-events">
            {TREE_EVENTS.map((event) => {
              const member = TREE_MEMBERS.find((m) => m.id === event.memberId);
              if (!member) return null;
              const isNew = !seenEventsRef.current.has(event.id);

              return (
                <SnapEventGroup
                  key={event.id}
                  event={event}
                  member={member}
                  genScale={genScale}
                  isNew={isNew}
                  onSeen={() => seenEventsRef.current.add(event.id)}
                />
              );
            })}
          </g>
        )}

        {galleryEvent && galleryMember && galleryLayout && showGallery && (
          <SnapEventGallery
            event={galleryEvent}
            x={galleryLayout.x}
            y={galleryLayout.y}
            width={galleryLayout.w}
            height={galleryLayout.h}
            connector={galleryLayout.connector}
            dotStart={galleryLayout.dotStart}
            dotEnd={galleryLayout.dotEnd}
            photos={BAR_MITZVAH_GALLERY}
            isNew={!seenGalleryRef.current}
            panDelay={photosDrive ? 0.75 : panX ? 0.65 : 0.2}
            scale={galleryScale}
            onSeen={() => {
              seenGalleryRef.current = true;
            }}
          />
        )}

        {chapter.reminderAct && reminderDrive && (
          <>
            <SnapBirthdayBadge
              x={badgePos.x}
              y={badgePos.y}
              visible={reminderDrive.showBadge}
              dismissing={reminderDrive.badgeDismissing}
            />
            <SnapReminderPhone
              x={phonePos.x}
              y={phonePos.y}
              visible={reminderDrive.showPhone}
            />
            <SnapReminderCursor
              targetX={badgePos.x}
              targetY={badgePos.y + BIRTHDAY_BADGE.h / 2}
              visible={reminderDrive.showCursor}
              clicking={reminderDrive.cursorClick}
            />
          </>
        )}
      </svg>

      {shareDrive?.showRequest && (
        <>
          <SnapConnectRequest
            leftPct={requestPos.leftPct}
            topPct={requestPos.topPct}
            width={requestPos.cardW}
            visible
            lightGreen={shareDrive.lightGreen}
            confirmPressed={shareDrive.confirmPressed}
            showCursor={shareDrive.showCursor}
            cursorClick={shareDrive.cursorClick}
          />
        </>
      )}
    </motion.div>
  );
}
