export interface SnapChapter {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  /** Tree snap stage index */
  treeStage: number;
  showEvents: boolean;
  showEventPhotos: boolean;
  showReminder: boolean;
  showAddButton: boolean;
  showShareBadges: boolean;
  treeScale: number;
}

export const SNAP_CHAPTERS: SnapChapter[] = [
  {
    id: "hero",
    label: "Begin",
    title: "Preserve Your Family Story for Generations",
    subtitle:
      "Build your Jewish family tree with names in Hebrew and English, sacred milestones, and memories that live on.",
    treeStage: 0,
    showEvents: false,
    showEventPhotos: false,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 1.15,
  },
  {
    id: "root",
    label: "Ancestor",
    title: "Every Tree Begins With Roots",
    subtitle:
      "Start with your earliest ancestors — the foundation of your family’s story across generations.",
    treeStage: 0,
    showEvents: false,
    showEventPhotos: false,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 1.2,
  },
  {
    id: "build",
    label: "Branches",
    title: "Build Your Family Tree",
    subtitle:
      "Add parents, children, and spouses. Watch branches extend across a wide, clear lineage view.",
    treeStage: 2,
    showEvents: false,
    showEventPhotos: false,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 1,
  },
  {
    id: "members",
    label: "Family",
    title: "Add Family Members",
    subtitle:
      "Rich profiles with photos, Hebrew names, birth dates, and the stories that make each person unique.",
    treeStage: 3,
    showEvents: false,
    showEventPhotos: false,
    showReminder: false,
    showAddButton: true,
    showShareBadges: false,
    treeScale: 0.95,
  },
  {
    id: "events",
    label: "Milestones",
    title: "Jewish Life Events",
    subtitle:
      "Brit milah, bar & bat mitzvah, chuppah, aliyah, yahrzeit, and seders — honor the moments that shape your family.",
    treeStage: 3,
    showEvents: true,
    showEventPhotos: false,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 0.92,
  },
  {
    id: "photos",
    label: "Memories",
    title: "Photos on Every Milestone",
    subtitle:
      "Attach wedding albums, synagogue photos, and family gatherings to the dates your relatives will never forget.",
    treeStage: 3,
    showEvents: true,
    showEventPhotos: true,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 0.9,
  },
  {
    id: "reminders",
    label: "Reminders",
    title: "Yahrzeit & Birthday Reminders",
    subtitle:
      "Automatic reminders for birthdays, anniversaries, and yahrzeits — keep every generation connected.",
    treeStage: 3,
    showEvents: true,
    showEventPhotos: true,
    showReminder: true,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 0.9,
  },
  {
    id: "generations",
    label: "Explore",
    title: "Explore Generations",
    subtitle:
      "Zoom out to see your full family spread wide — from great-grandparents to the youngest generation.",
    treeStage: 7,
    showEvents: true,
    showEventPhotos: true,
    showReminder: false,
    showAddButton: false,
    showShareBadges: false,
    treeScale: 0.78,
  },
  {
    id: "share",
    label: "Together",
    title: "Share With Family",
    subtitle:
      "Invite relatives to collaborate privately. Build your legacy together with secure, family-only access.",
    treeStage: 7,
    showEvents: true,
    showEventPhotos: true,
    showReminder: false,
    showAddButton: false,
    showShareBadges: true,
    treeScale: 0.75,
  },
];
