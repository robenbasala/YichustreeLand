import type { LucideIcon } from "lucide-react";
import {
  Baby,
  GraduationCap,
  Heart,
  Plane,
  Flame,
} from "lucide-react";

export interface FamilyEvent {
  id: string;
  type: string;
  title: string;
  date: string;
  description?: string;
  icon: LucideIcon;
  hasPhoto?: boolean;
  photoUrl?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  born?: string;
  died?: string;
  role?: string;
  avatar: string;
  x: number;
  y: number;
  generation: number;
  parentId?: string;
  spouseId?: string;
  events?: FamilyEvent[];
}

export const STORY_STEPS = [
  { id: 1, label: "Ancestor", short: "Root" },
  { id: 2, label: "Family Members", short: "Grow" },
  { id: 3, label: "Life Events", short: "Events" },
  { id: 4, label: "Photos", short: "Memories" },
  { id: 5, label: "Reminders", short: "Alerts" },
  { id: 6, label: "Generations", short: "Explore" },
  { id: 7, label: "Share", short: "Together" },
] as const;

export const FEATURES = [
  {
    id: "build",
    step: 1,
    title: "Build Your Family Tree",
    description:
      "Easily add parents, children, spouses, and relatives. Watch your lineage unfold branch by branch with intuitive drag-and-drop connections.",
    badge: "Core",
  },
  {
    id: "members",
    step: 2,
    title: "Add Family Members",
    description:
      "Create rich profiles for every relative — names, dates, places, and stories. Each person becomes a living chapter in your family narrative.",
    badge: "Profiles",
  },
  {
    id: "events",
    step: 3,
    title: "Add Life Events",
    description:
      "Mark the milestones that shaped your family — births, weddings, graduations, immigration journeys, and memorials.",
    badge: "Timeline",
  },
  {
    id: "photos",
    step: 4,
    title: "Add Photos to Events",
    description:
      "Attach photos and memories to the moments that matter most. Turn dates into stories your grandchildren will treasure.",
    badge: "Memories",
  },
  {
    id: "reminders",
    step: 5,
    title: "Birthday & Anniversary Reminders",
    description:
      "Never miss a birthday, anniversary, or yahrzeit. Gentle reminders keep your family connected across time and distance.",
    badge: "Smart",
  },
  {
    id: "generations",
    step: 6,
    title: "Explore Generations",
    description:
      "Zoom out to discover connections across generations. Uncover patterns, stories, and the threads that bind your family together.",
    badge: "Discover",
  },
  {
    id: "share",
    step: 7,
    title: "Share With Family",
    description:
      "Invite relatives to collaborate privately. Build your tree together with secure sharing and real-time updates.",
    badge: "Together",
  },
] as const;

export const SHARE_BADGES = [
  "Invite relatives",
  "Private family access",
  "Secure sharing",
  "Collaborative editing",
] as const;

/** Tree layout coordinates (viewBox 0 0 800 600) */
export const familyMembers: FamilyMember[] = [
  {
    id: "ancestor",
    name: "Samuel Cohen",
    born: "1920",
    died: "1998",
    role: "Patriarch",
    avatar: "SC",
    x: 400,
    y: 60,
    generation: 0,
    events: [],
  },
  {
    id: "child1",
    name: "Rachel Cohen",
    born: "1945",
    role: "Daughter",
    avatar: "RC",
    x: 280,
    y: 180,
    generation: 1,
    parentId: "ancestor",
    events: [
      {
        id: "e1",
        type: "birth",
        title: "Birth",
        date: "Mar 12, 1945",
        icon: Baby,
      },
      {
        id: "e2",
        type: "wedding",
        title: "Wedding",
        date: "Jun 18, 1968",
        icon: Heart,
      },
    ],
  },
  {
    id: "child2",
    name: "David Cohen",
    born: "1948",
    role: "Son",
    avatar: "DC",
    x: 520,
    y: 180,
    generation: 1,
    parentId: "ancestor",
    events: [
      {
        id: "e3",
        type: "birth",
        title: "Birth",
        date: "Aug 3, 1948",
        icon: Baby,
      },
      {
        id: "e4",
        type: "graduation",
        title: "Graduation",
        date: "May 1970",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "grand1",
    name: "Miriam Levy",
    born: "1972",
    role: "Granddaughter",
    avatar: "ML",
    x: 200,
    y: 320,
    generation: 2,
    parentId: "child1",
    events: [
      {
        id: "e5",
        type: "immigration",
        title: "Immigration",
        date: "Sep 1990",
        description: "Arrived in New York",
        icon: Plane,
        hasPhoto: true,
        photoUrl: "/api/placeholder/120/80",
      },
    ],
  },
  {
    id: "grand2",
    name: "Benjamin Cohen",
    born: "1975",
    role: "Grandson",
    avatar: "BC",
    x: 360,
    y: 320,
    generation: 2,
    parentId: "child1",
    events: [],
  },
  {
    id: "grand3",
    name: "Sarah Cohen",
    born: "1978",
    role: "Granddaughter",
    avatar: "SC",
    x: 520,
    y: 320,
    generation: 2,
    parentId: "child2",
    events: [
      {
        id: "e6",
        type: "memorial",
        title: "Yahrzeit",
        date: "Annual",
        icon: Flame,
      },
    ],
  },
  {
    id: "great1",
    name: "Noah Levy",
    born: "2001",
    role: "Great-grandson",
    avatar: "NL",
    x: 140,
    y: 460,
    generation: 3,
    parentId: "grand1",
    events: [],
  },
  {
    id: "great2",
    name: "Leah Cohen",
    born: "2004",
    role: "Great-granddaughter",
    avatar: "LC",
    x: 300,
    y: 460,
    generation: 3,
    parentId: "grand2",
    events: [],
  },
  {
    id: "great3",
    name: "Ethan Cohen",
    born: "2008",
    role: "Great-grandson",
    avatar: "EC",
    x: 480,
    y: 460,
    generation: 3,
    parentId: "grand3",
    events: [],
  },
];

export function getBranchPath(
  parent: FamilyMember,
  child: FamilyMember
): string {
  const midY = (parent.y + child.y) / 2;
  return `M ${parent.x} ${parent.y + 28} 
          C ${parent.x} ${midY}, ${child.x} ${midY}, ${child.x} ${child.y - 28}`;
}

export function getMembersVisibleAtStage(stage: number): string[] {
  const order = [
    "ancestor",
    "child1",
    "child2",
    "grand1",
    "grand2",
    "grand3",
    "great1",
    "great2",
    "great3",
  ];
  const counts = [1, 3, 6, 6, 6, 9, 9];
  const count = counts[Math.min(stage, counts.length - 1)] ?? 1;
  return order.slice(0, count);
}

export function getBranchesVisibleAtStage(stage: number): Array<[string, string]> {
  const all: Array<[string, string]> = [
    ["ancestor", "child1"],
    ["ancestor", "child2"],
    ["child1", "grand1"],
    ["child1", "grand2"],
    ["child2", "grand3"],
    ["grand1", "great1"],
    ["grand2", "great2"],
    ["grand3", "great3"],
  ];
  const counts = [0, 2, 5, 5, 5, 8, 8];
  const count = counts[Math.min(stage, counts.length - 1)] ?? 0;
  return all.slice(0, count);
}
