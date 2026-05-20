export interface SnapChapter {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  showTree: boolean;
  treeStage: number;
  genScale: Record<number, number>;
  activeMemberIds?: string[];
  selectedMemberId?: string;
  treeScale: number;
  showShareBadges?: boolean;
  /** Show animated Jewish event cards on the tree */
  showEvents?: boolean;
  /** Pan tree right (0–1 = fraction of tree width, e.g. 0.5 = half off-screen) */
  treePanX?: number;
  /** Photo gallery attached to this event id */
  showGalleryForEvent?: string;
  /** Staged reminder animation (step 6) */
  reminderAct?: boolean;
  /** Staged share / connect animation (step 7) */
  shareAct?: boolean;
}

export const SNAP_CHAPTERS: SnapChapter[] = [
  {
    id: "one-name",
    label: "Start",
    title: "Start With One Name",
    subtitle:
      "Every family's **yichus** begins with one person. Add the first name and watch your family history start taking shape.",
    showTree: false,
    treeStage: 0,
    genScale: {},
    treeScale: 1,
  },
  {
    id: "grow-tree",
    label: "Couple",
    title: "Grow Your Family Tree",
    subtitle:
      "Add parents, children, spouses, and relatives. Watch every connection become a living branch in your family tree.",
    showTree: true,
    treeStage: 1,
    genScale: { 0: 1 },
    treeScale: 1,
  },
  {
    id: "generations",
    label: "Children",
    title: "Build Generations",
    subtitle:
      "Expand your tree across generations and see how every person connects to the bigger family story.",
    showTree: true,
    treeStage: 2,
    genScale: { 0: 0.72, 1: 1 },
    treeScale: 1,
  },
  {
    id: "life-events",
    label: "Events",
    title: "Add Life Events",
    subtitle:
      "Attach important moments to each family member — births, weddings, graduations, moves, memorials, and more.",
    showTree: true,
    treeStage: 3,
    genScale: { 0: 0.55, 1: 0.55, 2: 1 },
    treeScale: 0.95,
    showEvents: true,
  },
  {
    id: "photos",
    label: "Photos",
    title: "Preserve Photos & Memories",
    subtitle:
      "Upload photos to events and turn simple dates into meaningful memories your family can see and remember.",
    showTree: true,
    treeStage: 3,
    genScale: { 0: 0.55, 1: 0.55, 2: 1 },
    treeScale: 0.95,
    showEvents: true,
    showGalleryForEvent: "ev-avraham",
  },
  {
    id: "reminders",
    label: "Remind",
    title: "Send Family Reminders",
    subtitle:
      "Automatically send birthday, anniversary, and special-date reminders so important family moments are never forgotten.",
    showTree: true,
    treeStage: 3,
    genScale: { 0: 0.55, 1: 0.55, 2: 1 },
    treeScale: 0.95,
    showEvents: true,
    showGalleryForEvent: "ev-avraham",
    reminderAct: true,
  },
  {
    id: "share",
    label: "Share",
    title: "Share Your Legacy",
    subtitle:
      "Invite relatives, share the tree securely, and preserve your family story for future generations.",
    showTree: true,
    treeStage: 3,
    genScale: { 0: 0.55, 1: 0.55, 2: 1 },
    treeScale: 0.95,
    treePanX: 0,
    showEvents: false,
    shareAct: true,
  },
];
