import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BookOpen,
  Flame,
  Heart,
  Plane,
  Star,
  Wine,
} from "lucide-react";

/** Unsplash — real photos, crop faces/scenes */
export const PHOTOS = {
  patriarch:
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=160&h=160&fit=crop&crop=faces",
  matriarch:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=faces",
  youngMan:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
  youngWoman:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
  teenBoy:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
  teenGirl:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
  child:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces",
  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=320&h=200&fit=crop",
  chuppah:
    "https://images.unsplash.com/photo-1522673603000-9f2510981d64?w=320&h=200&fit=crop",
  barMitzvah:
    "https://images.unsplash.com/photo-1544962033-77c6064476e0?w=320&h=200&fit=crop",
  familyTable:
    "https://images.unsplash.com/photo-1609220136736-44360e213e79?w=320&h=200&fit=crop",
  synagogue:
    "https://images.unsplash.com/photo-1598511386331-933fd4c969b6?w=320&h=200&fit=crop",
  israel:
    "https://images.unsplash.com/photo-1548013146-724f680d6dee?w=320&h=200&fit=crop",
} as const;

export interface FamilyEvent {
  id: string;
  type: string;
  title: string;
  date: string;
  description?: string;
  icon: LucideIcon;
  photoUrl?: string;
  /** First snap stage where this event appears */
  fromStage: number;
}

export interface TreeMember {
  id: string;
  name: string;
  hebrewName?: string;
  born?: string;
  died?: string;
  avatar: string;
  photoUrl?: string;
  x: number;
  y: number;
  generation: number;
  parentId?: string;
  spouseId?: string;
  /** First snap stage where member is visible */
  fromStage: number;
  events?: FamilyEvent[];
}

export interface TreeBranch {
  id: string;
  parentId: string;
  childId: string;
  fromStage: number;
  isSpouse?: boolean;
}

export const VIEWBOX = { w: 1800, h: 1050 };
export const CENTER_X = VIEWBOX.w / 2;

const GEN_Y = [70, 240, 480, 750];
const GEN_SPREAD = [160, 720, 900, 1050];

function xForIndex(i: number, count: number, spread: number) {
  if (count === 1) return CENTER_X;
  const start = CENTER_X - spread / 2;
  return start + (spread / (count - 1)) * i;
}

export const TREE_MEMBERS: TreeMember[] = [
  {
    id: "g0-0",
    name: "Samuel Cohen",
    hebrewName: "שמואל כהן",
    born: "1920",
    died: "1998",
    avatar: "SC",
    photoUrl: PHOTOS.patriarch,
    x: CENTER_X - 90,
    y: GEN_Y[0],
    generation: 0,
    fromStage: 0,
    spouseId: "g0-1",
  },
  {
    id: "g0-1",
    name: "Ruth Cohen",
    hebrewName: "רות כהן",
    born: "1924",
    died: "2001",
    avatar: "RC",
    photoUrl: PHOTOS.matriarch,
    x: CENTER_X + 90,
    y: GEN_Y[0],
    generation: 0,
    fromStage: 0,
    spouseId: "g0-0",
  },
  {
    id: "g1-0",
    name: "Rachel Cohen",
    hebrewName: "רחל כהן",
    born: "1945",
    avatar: "RC",
    photoUrl: PHOTOS.youngWoman,
    x: xForIndex(0, 4, GEN_SPREAD[1]),
    y: GEN_Y[1],
    generation: 1,
    parentId: "g0-0",
    fromStage: 2,
    events: [
      {
        id: "e-r-wed",
        type: "wedding",
        title: "Chuppah — Wedding",
        date: "18 Sivan 5728",
        description: "Tel Aviv",
        icon: Heart,
        photoUrl: PHOTOS.chuppah,
        fromStage: 4,
      },
    ],
  },
  {
    id: "g1-1",
    name: "David Cohen",
    hebrewName: "דוד כהן",
    born: "1948",
    avatar: "DC",
    photoUrl: PHOTOS.youngMan,
    x: xForIndex(1, 4, GEN_SPREAD[1]),
    y: GEN_Y[1],
    generation: 1,
    parentId: "g0-0",
    fromStage: 2,
  },
  {
    id: "g1-2",
    name: "Leah Cohen",
    hebrewName: "לאה כהן",
    born: "1951",
    avatar: "LC",
    photoUrl: PHOTOS.youngWoman,
    x: xForIndex(2, 4, GEN_SPREAD[1]),
    y: GEN_Y[1],
    generation: 1,
    parentId: "g0-1",
    fromStage: 2,
  },
  {
    id: "g1-3",
    name: "Joseph Cohen",
    hebrewName: "יוסף כהן",
    born: "1954",
    avatar: "JC",
    photoUrl: PHOTOS.youngMan,
    x: xForIndex(3, 4, GEN_SPREAD[1]),
    y: GEN_Y[1],
    generation: 1,
    parentId: "g0-1",
    fromStage: 2,
  },
  {
    id: "g2-0",
    name: "Miriam Levy",
    hebrewName: "מרים לוי",
    born: "1972",
    avatar: "ML",
    photoUrl: PHOTOS.youngWoman,
    x: xForIndex(0, 4, GEN_SPREAD[2]),
    y: GEN_Y[2],
    generation: 2,
    parentId: "g1-0",
    fromStage: 3,
    events: [
      {
        id: "e-ml-bm",
        type: "bar-mitzvah",
        title: "Bat Mitzvah",
        date: "4 Nisan 5745",
        icon: BookOpen,
        photoUrl: PHOTOS.synagogue,
        fromStage: 4,
      },
      {
        id: "e-ml-aliyah",
        type: "aliyah",
        title: "Aliyah to Israel",
        date: "Elul 5750",
        description: "Made aliyah with family",
        icon: Plane,
        photoUrl: PHOTOS.israel,
        fromStage: 5,
      },
    ],
  },
  {
    id: "g2-1",
    name: "Benjamin Cohen",
    hebrewName: "בנימין כהן",
    born: "1975",
    avatar: "BC",
    photoUrl: PHOTOS.youngMan,
    x: xForIndex(1, 4, GEN_SPREAD[2]),
    y: GEN_Y[2],
    generation: 2,
    parentId: "g1-0",
    fromStage: 3,
    events: [
      {
        id: "e-bc-bm",
        type: "bar-mitzvah",
        title: "Bar Mitzvah",
        date: "22 Shvat 5748",
        icon: Star,
        photoUrl: PHOTOS.barMitzvah,
        fromStage: 4,
      },
    ],
  },
  {
    id: "g2-2",
    name: "Sarah Weiss",
    hebrewName: "שרה וייס",
    born: "1978",
    avatar: "SW",
    photoUrl: PHOTOS.youngWoman,
    x: xForIndex(2, 4, GEN_SPREAD[2]),
    y: GEN_Y[2],
    generation: 2,
    parentId: "g1-2",
    fromStage: 3,
    events: [
      {
        id: "e-sw-brit",
        type: "brit",
        title: "Brit Milah",
        date: "8 Tishrei 5739",
        icon: Baby,
        fromStage: 4,
      },
    ],
  },
  {
    id: "g2-3",
    name: "Daniel Cohen",
    hebrewName: "דניאל כהן",
    born: "1981",
    avatar: "DC",
    photoUrl: PHOTOS.youngMan,
    x: xForIndex(3, 4, GEN_SPREAD[2]),
    y: GEN_Y[2],
    generation: 2,
    parentId: "g1-3",
    fromStage: 3,
    events: [
      {
        id: "e-dc-yahr",
        type: "yahrzeit",
        title: "Yahrzeit — Zadie Samuel",
        date: "15 Cheshvan · Annual",
        description: "Candle lighting reminder",
        icon: Flame,
        photoUrl: PHOTOS.synagogue,
        fromStage: 4,
      },
    ],
  },
  {
    id: "g3-0",
    name: "Noah Levy",
    hebrewName: "נועם לוי",
    born: "2001",
    avatar: "NL",
    photoUrl: PHOTOS.teenBoy,
    x: xForIndex(0, 4, GEN_SPREAD[3]),
    y: GEN_Y[3],
    generation: 3,
    parentId: "g2-0",
    fromStage: 7,
    events: [
      {
        id: "e-nl-bm",
        type: "bar-mitzvah",
        title: "Bar Mitzvah",
        date: "10 Iyar 5774",
        icon: BookOpen,
        photoUrl: PHOTOS.barMitzvah,
        fromStage: 7,
      },
    ],
  },
  {
    id: "g3-1",
    name: "Emma Levy",
    hebrewName: "אמה לוי",
    born: "2004",
    avatar: "EL",
    photoUrl: PHOTOS.teenGirl,
    x: xForIndex(1, 4, GEN_SPREAD[3]),
    y: GEN_Y[3],
    generation: 3,
    parentId: "g2-0",
    fromStage: 7,
  },
  {
    id: "g3-2",
    name: "Jacob Cohen",
    hebrewName: "יעקב כהן",
    born: "2006",
    avatar: "JC",
    photoUrl: PHOTOS.teenBoy,
    x: xForIndex(2, 4, GEN_SPREAD[3]),
    y: GEN_Y[3],
    generation: 3,
    parentId: "g2-1",
    fromStage: 7,
  },
  {
    id: "g3-3",
    name: "Maya Cohen",
    hebrewName: "מאיה כהן",
    born: "2009",
    avatar: "MC",
    photoUrl: PHOTOS.child,
    x: xForIndex(3, 4, GEN_SPREAD[3]),
    y: GEN_Y[3],
    generation: 3,
    parentId: "g2-2",
    fromStage: 7,
    events: [
      {
        id: "e-mc-pesach",
        type: "pesach",
        title: "Pesach Seder",
        date: "15 Nisan 5784",
        icon: Wine,
        photoUrl: PHOTOS.familyTable,
        fromStage: 7,
      },
    ],
  },
];

export const TREE_BRANCHES: TreeBranch[] = [
  { id: "sp-0", parentId: "g0-0", childId: "g0-1", fromStage: 0, isSpouse: true },
  { id: "b-1-0", parentId: "g0-0", childId: "g1-0", fromStage: 2 },
  { id: "b-1-1", parentId: "g0-0", childId: "g1-1", fromStage: 2 },
  { id: "b-1-2", parentId: "g0-1", childId: "g1-2", fromStage: 2 },
  { id: "b-1-3", parentId: "g0-1", childId: "g1-3", fromStage: 2 },
  { id: "b-2-0", parentId: "g1-0", childId: "g2-0", fromStage: 3 },
  { id: "b-2-1", parentId: "g1-0", childId: "g2-1", fromStage: 3 },
  { id: "b-2-2", parentId: "g1-2", childId: "g2-2", fromStage: 3 },
  { id: "b-2-3", parentId: "g1-3", childId: "g2-3", fromStage: 3 },
  { id: "b-3-0", parentId: "g2-0", childId: "g3-0", fromStage: 7 },
  { id: "b-3-1", parentId: "g2-0", childId: "g3-1", fromStage: 7 },
  { id: "b-3-2", parentId: "g2-1", childId: "g3-2", fromStage: 7 },
  { id: "b-3-3", parentId: "g2-2", childId: "g3-3", fromStage: 7 },
];

export function getBranchPath(
  parent: TreeMember,
  child: TreeMember,
  isSpouse = false
): string {
  if (isSpouse) {
    const midY = parent.y + 12;
    return `M ${parent.x} ${parent.y + 20} Q ${CENTER_X} ${midY} ${child.x} ${child.y + 20}`;
  }
  const midY = (parent.y + child.y) / 2;
  const cp = (child.x - parent.x) * 0.12;
  return `M ${parent.x} ${parent.y + 36}
    C ${parent.x + cp} ${midY}, ${child.x - cp} ${midY}, ${child.x} ${child.y - 36}`;
}

export function membersAtStage(stage: number): TreeMember[] {
  return TREE_MEMBERS.filter((m) => m.fromStage <= stage);
}

export function branchesAtStage(stage: number): TreeBranch[] {
  return TREE_BRANCHES.filter((b) => b.fromStage <= stage);
}

export function eventsAtStage(stage: number, showPhotos: boolean): FamilyEvent[] {
  const members = membersAtStage(stage);
  return members.flatMap((m) =>
    (m.events ?? []).filter((e) => {
      if (e.fromStage > stage) return false;
      if (!showPhotos && e.photoUrl && stage < 5) return false;
      return true;
    })
  );
}

export const REMINDER_MEMBER_ID = "g2-0";
