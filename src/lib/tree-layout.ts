export const PHOTOS = {
  david: "/photos/david.png",
  naomi: "/photos/naomi.png",
  avraham: "/photos/Avraham.png",
  yaakov: "/photos/Yaakov.png",
  rachel: "/photos/Rachel.png",
  leah: "/photos/Leah.png",
  chani: "/photos/Chani.png",
  sarah: "/photos/Sarah.png",
  mosheh: "/photos/Mosheh.png",
  reuven: "/photos/Reuven.png",
  yosef: "/photos/Yosef.png",
} as const;

export interface TreeMember {
  id: string;
  name: string;
  hebrewName?: string;
  avatar: string;
  photoUrl?: string;
  x: number;
  y: number;
  generation: number;
  parentId?: string;
  spouseId?: string;
  fromStage: number;
  /** Stagger animation: lower = appears first within same stage */
  animOrder: number;
}

export interface TreeBranch {
  id: string;
  parentId: string;
  childId: string;
  fromStage: number;
  isSpouse?: boolean;
  animOrder: number;
}

export const VIEWBOX = { w: 1500, h: 840 };
export const CENTER_X = VIEWBOX.w / 2;

const Y = { g0: 100, g1: 310, g2: 560 };

/** Half-width of node circle per generation (matches SnapPersonNode sizes) */
export function nodeHalf(generation: number, scale = 1): number {
  const base = generation === 0 ? 46 : generation === 1 ? 38 : 32;
  return Math.round(base * scale);
}

export function spouseConnectorY(genScale: Record<number, number> = {}): number {
  const s0 = genScale[0] ?? 1;
  return Y.g0 + nodeHalf(0, s0);
}

export function busYForG1(genScale: Record<number, number> = {}): number {
  const s0 = genScale[0] ?? 1;
  const s1 = genScale[1] ?? 1;
  const bottomG0 = Y.g0 + nodeHalf(0, s0);
  const topG1 = Y.g1 - nodeHalf(1, s1);
  return bottomG0 + (topG1 - bottomG0) * 0.55;
}

export function busYForG2(genScale: Record<number, number> = {}): number {
  const s1 = genScale[1] ?? 1;
  const s2 = genScale[2] ?? 1;
  const bottomG1 = Y.g1 + nodeHalf(1, s1);
  const topG2 = Y.g2 - nodeHalf(2, s2);
  return bottomG1 + (topG2 - bottomG1) * 0.55;
}

export interface TreeLine {
  id: string;
  d: string;
  fromStage: number;
  /** Row index for top-to-bottom reveal: 0=couple, 1=children, 2=grandchildren */
  row: number;
  animOrder: number;
  strokeWidth?: number;
}

function spread(count: number, width: number, center = CENTER_X) {
  if (count === 1) return [center];
  const start = center - width / 2;
  return Array.from({ length: count }, (_, i) => start + (width / (count - 1)) * i);
}

const g1x = spread(5, 1020, CENTER_X);
const AVRAHAM_X = g1x[0];
const RACHEL_SPOUSE_X = g1x[0] + 98;
const AVRAHAM_COUPLE_X = (AVRAHAM_X + RACHEL_SPOUSE_X) / 2;
const g2x = spread(3, 360, AVRAHAM_COUPLE_X);

export const TREE_MEMBERS: TreeMember[] = [
  {
    id: "david",
    name: "David",
    hebrewName: "דוד",
    avatar: "D",
    photoUrl: PHOTOS.david,
    x: CENTER_X - 110,
    y: Y.g0,
    generation: 0,
    fromStage: 1,
    animOrder: 0,
    spouseId: "naomi",
  },
  {
    id: "naomi",
    name: "Naomi",
    hebrewName: "נעמי",
    avatar: "N",
    photoUrl: PHOTOS.naomi,
    x: CENTER_X + 110,
    y: Y.g0,
    generation: 0,
    fromStage: 1,
    animOrder: 1,
    spouseId: "david",
  },
  {
    id: "avraham",
    name: "Avraham",
    hebrewName: "אברהם",
    avatar: "A",
    photoUrl: PHOTOS.avraham,
    x: AVRAHAM_X,
    y: Y.g1,
    generation: 1,
    parentId: "david",
    fromStage: 2,
    animOrder: 10,
    spouseId: "rachel",
  },
  {
    id: "rachel",
    name: "Rachel",
    hebrewName: "רחל",
    avatar: "R",
    photoUrl: PHOTOS.rachel,
    x: RACHEL_SPOUSE_X,
    y: Y.g1,
    generation: 1,
    fromStage: 2,
    animOrder: 11,
    spouseId: "avraham",
  },
  {
    id: "yaakov",
    name: "Yaakov",
    hebrewName: "יעקב",
    avatar: "Y",
    photoUrl: PHOTOS.yaakov,
    x: g1x[1],
    y: Y.g1,
    generation: 1,
    parentId: "david",
    fromStage: 2,
    animOrder: 12,
  },
  {
    id: "leah",
    name: "Leah",
    hebrewName: "לאה",
    avatar: "L",
    photoUrl: PHOTOS.leah,
    x: g1x[2],
    y: Y.g1,
    generation: 1,
    parentId: "david",
    fromStage: 2,
    animOrder: 13,
  },
  {
    id: "chani",
    name: "Chani",
    hebrewName: "חני",
    avatar: "Ch",
    photoUrl: PHOTOS.chani,
    x: g1x[3],
    y: Y.g1,
    generation: 1,
    parentId: "naomi",
    fromStage: 2,
    animOrder: 14,
  },
  {
    id: "sarah",
    name: "Sarah",
    hebrewName: "שרה",
    avatar: "S",
    photoUrl: PHOTOS.sarah,
    x: g1x[4],
    y: Y.g1,
    generation: 1,
    parentId: "naomi",
    fromStage: 2,
    animOrder: 15,
  },
  {
    id: "mosheh",
    name: "Mosheh",
    hebrewName: "משה",
    avatar: "M",
    photoUrl: PHOTOS.mosheh,
    x: g2x[0],
    y: Y.g2,
    generation: 2,
    parentId: "avraham",
    fromStage: 3,
    animOrder: 20,
  },
  {
    id: "reuven",
    name: "Reuven",
    hebrewName: "ראובן",
    avatar: "Re",
    photoUrl: PHOTOS.reuven,
    x: g2x[1],
    y: Y.g2,
    generation: 2,
    parentId: "avraham",
    fromStage: 3,
    animOrder: 21,
  },
  {
    id: "yosef",
    name: "Yosef",
    hebrewName: "יוסף",
    avatar: "Y",
    photoUrl: PHOTOS.yosef,
    x: g2x[2],
    y: Y.g2,
    generation: 2,
    parentId: "avraham",
    fromStage: 3,
    animOrder: 22,
  },
];

export const TREE_BRANCHES: TreeBranch[] = [
  { id: "sp", parentId: "david", childId: "naomi", fromStage: 1, isSpouse: true, animOrder: 2 },
  { id: "sp-ac", parentId: "avraham", childId: "rachel", fromStage: 2, isSpouse: true, animOrder: 12 },
  { id: "b-a", parentId: "david", childId: "avraham", fromStage: 2, animOrder: 15 },
  { id: "b-ya", parentId: "david", childId: "yaakov", fromStage: 2, animOrder: 16 },
  { id: "b-l", parentId: "david", childId: "leah", fromStage: 2, animOrder: 17 },
  { id: "b-ch", parentId: "naomi", childId: "chani", fromStage: 2, animOrder: 18 },
  { id: "b-s", parentId: "naomi", childId: "sarah", fromStage: 2, animOrder: 20 },
  { id: "b-m", parentId: "avraham", childId: "mosheh", fromStage: 3, animOrder: 23 },
  { id: "b-re", parentId: "avraham", childId: "reuven", fromStage: 3, animOrder: 24 },
  { id: "b-y", parentId: "avraham", childId: "yosef", fromStage: 3, animOrder: 25 },
];

/** 90° orthogonal connector (scaled to match node sizes) */
export function getBranchPath(
  parent: TreeMember,
  child: TreeMember,
  isSpouse = false,
  genScale: Record<number, number> = {}
): string {
  if (isSpouse) {
    const gen = parent.generation;
    const half = nodeHalf(gen, genScale[gen] ?? 1);
    const y =
      gen === 0
        ? spouseConnectorY(genScale)
        : Y.g1 + nodeHalf(1, genScale[1] ?? 1);
    return `M ${parent.x + half} ${y} L ${child.x - half} ${y}`;
  }

  if (child.generation === 1 && parent.generation === 0) {
    const busY = busYForG1(genScale);
    const childR = nodeHalf(1, genScale[1] ?? 1);
    return `M ${child.x} ${busY} L ${child.x} ${child.y - childR}`;
  }

  if (child.generation === 2 && parent.generation === 1) {
    const busY = busYForG2(genScale);
    const childR = nodeHalf(2, genScale[2] ?? 1);
    return `M ${child.x} ${busY} L ${child.x} ${child.y - childR}`;
  }

  const parentR = nodeHalf(parent.generation, genScale[parent.generation] ?? 1);
  const childR = nodeHalf(child.generation, genScale[child.generation] ?? 1);
  const py = parent.y + parentR;
  const cy = child.y - childR;
  const midY = Math.round(py + (cy - py) * 0.55);
  return `M ${parent.x} ${py} L ${parent.x} ${midY} L ${child.x} ${midY} L ${child.x} ${cy}`;
}

/** All connector lines visible at stage, ordered top → bottom for animation */
export function getTreeLines(
  stage: number,
  genScale: Record<number, number> = {}
): TreeLine[] {
  if (stage < 1) return [];

  const lines: TreeLine[] = [];
  const joinY = spouseConnectorY(genScale);
  const busY1 = busYForG1(genScale);
  const busY2 = busYForG2(genScale);
  const half0 = nodeHalf(0, genScale[0] ?? 1);

  const david = TREE_MEMBERS.find((m) => m.id === "david")!;
  const naomi = TREE_MEMBERS.find((m) => m.id === "naomi")!;

  lines.push({
    id: "sp",
    d: `M ${david.x + half0} ${joinY} L ${naomi.x - half0} ${joinY}`,
    fromStage: 1,
    row: 0,
    animOrder: 0,
    strokeWidth: 2.5,
  });

  if (stage >= 2) {
    const avraham = TREE_MEMBERS.find((m) => m.id === "avraham")!;
    const rachelSpouse = TREE_MEMBERS.find((m) => m.id === "rachel")!;
    const half1 = nodeHalf(1, genScale[1] ?? 1);
    const joinY1 = Y.g1 + half1;

    lines.push({
      id: "sp-ac",
      d: `M ${avraham.x + half1} ${joinY1} L ${rachelSpouse.x - half1} ${joinY1}`,
      fromStage: 2,
      row: 1,
      animOrder: 3,
      strokeWidth: 2.5,
    });

    lines.push({
      id: "stem-g1",
      d: `M ${CENTER_X} ${joinY} L ${CENTER_X} ${busY1}`,
      fromStage: 2,
      row: 0,
      animOrder: 1,
    });
    lines.push({
      id: "bus-g1",
      d: `M ${g1x[0]} ${busY1} L ${g1x[4]} ${busY1}`,
      fromStage: 2,
      row: 1,
      animOrder: 2,
    });

    const g1Children = TREE_MEMBERS.filter((m) => m.generation === 1 && m.parentId);
    for (const child of g1Children) {
      const childR = nodeHalf(1, genScale[1] ?? 1);
      lines.push({
        id: `drop-${child.id}`,
        d: `M ${child.x} ${busY1} L ${child.x} ${child.y - childR}`,
        fromStage: 2,
        row: 1,
        animOrder: child.animOrder,
      });
    }
  }

  if (stage >= 3) {
    const avraham = TREE_MEMBERS.find((m) => m.id === "avraham")!;
    const rachelSpouse = TREE_MEMBERS.find((m) => m.id === "rachel")!;
    const stemY = Y.g1 + nodeHalf(1, genScale[1] ?? 1);
    const coupleX = Math.round((avraham.x + rachelSpouse.x) / 2);
    lines.push({
      id: "stem-avraham",
      d: `M ${coupleX} ${stemY} L ${coupleX} ${busY2}`,
      fromStage: 3,
      row: 1,
      animOrder: 0,
    });
    lines.push({
      id: "bus-g2",
      d: `M ${g2x[0]} ${busY2} L ${g2x[2]} ${busY2}`,
      fromStage: 3,
      row: 2,
      animOrder: 1,
    });

    const g2Children = TREE_MEMBERS.filter((m) => m.generation === 2);
    for (const child of g2Children) {
      const childR = nodeHalf(2, genScale[2] ?? 1);
      lines.push({
        id: `drop-${child.id}`,
        d: `M ${child.x} ${busY2} L ${child.x} ${child.y - childR}`,
        fromStage: 3,
        row: 2,
        animOrder: child.animOrder,
      });
    }
  }

  return lines;
}

export function linesAtStage(stage: number, genScale: Record<number, number> = {}): TreeLine[] {
  return getTreeLines(stage, genScale);
}

export function linesNewAtStage(
  stage: number,
  genScale: Record<number, number> = {}
): TreeLine[] {
  return getTreeLines(stage, genScale).filter((l) => l.fromStage === stage);
}

export function membersAtStage(stage: number): TreeMember[] {
  if (stage < 1) return [];
  return TREE_MEMBERS.filter((m) => m.fromStage <= stage);
}

export function branchesAtStage(stage: number): TreeBranch[] {
  if (stage < 1) return [];
  return TREE_BRANCHES.filter((b) => b.fromStage <= stage);
}

export function membersNewAtStage(stage: number): TreeMember[] {
  return TREE_MEMBERS.filter((m) => m.fromStage === stage);
}

export function branchesNewAtStage(stage: number): TreeBranch[] {
  return TREE_BRANCHES.filter((b) => b.fromStage === stage);
}

export interface TreeEvent {
  id: string;
  memberId: string;
  title: string;
  date: string;
  parashah: string;
  color: string;
  glow: string;
  animOrder: number;
  side: "left" | "right" | "center";
  /** Diagonal connector from photo; card appears after line draws */
  connector?: "orthogonal" | "diagonal-up" | "diagonal-left" | "diagonal-down";
  lineFirst?: boolean;
}

/** Life events on tree members (stage 4 / life-events chapter) */
export const TREE_EVENTS: TreeEvent[] = [
  {
    id: "ev-avraham",
    memberId: "avraham",
    title: "Bar Mitzvah",
    date: "22 Adar 5748",
    parashah: "Parashat Vayakhel",
    color: "#0d9488",
    glow: "rgba(13, 148, 136, 0.6)",
    animOrder: 0,
    side: "center",
    connector: "diagonal-left",
    lineFirst: true,
  },
  {
    id: "ev-leah",
    memberId: "leah",
    title: "Chuppah",
    date: "15 Sivan 5770",
    parashah: "Parashat Behaalotecha",
    color: "#db2777",
    glow: "rgba(219, 39, 119, 0.5)",
    animOrder: 1,
    side: "center",
    connector: "diagonal-down",
    lineFirst: true,
  },
  {
    id: "ev-yosef",
    memberId: "yosef",
    title: "Brit Milah",
    date: "12 Tevet 5778",
    parashah: "Parashat Vayechi",
    color: "#d97706",
    glow: "rgba(217, 119, 6, 0.55)",
    animOrder: 2,
    side: "center",
    connector: "diagonal-down",
    lineFirst: true,
  },
  {
    id: "ev-david",
    memberId: "david",
    title: "Yahrzeit",
    date: "4 Cheshvan 5780",
    parashah: "Parashat Lech-Lecha",
    color: "#475569",
    glow: "rgba(71, 85, 105, 0.55)",
    animOrder: 3,
    side: "center",
    connector: "diagonal-up",
    lineFirst: true,
  },
];

export const EVENT_CARD = { w: 220, h: 128 };
/** Vertical photo strip — sits left of event card */
export const GALLERY_CARD = { w: 132, h: 412 };

/** Bar Mitzvah gallery — local photos in /public/photos/gallery */
export const BAR_MITZVAH_GALLERY = [
  "/photos/gallery/bm-1.jpg",
  "/photos/gallery/bm-2.jpg",
  "/photos/gallery/bm-3.jpg",
  "/photos/gallery/bm-4.jpg",
  "/photos/gallery/bm-5.jpg",
  "/photos/gallery/bm-6.jpg",
  "/photos/gallery/bm-7.jpg",
  "/photos/gallery/bm-8.jpg",
] as const;

export const BAR_MITZVAH_GALLERY_INITIAL = 4;

export function getEventLayout(
  member: TreeMember,
  event: TreeEvent,
  genScale: Record<number, number> = {}
) {
  const half = nodeHalf(member.generation, genScale[member.generation] ?? 1);
  const { w, h } = EVENT_CARD;

  if (event.connector === "diagonal-up") {
    const anchorX = member.x;
    const anchorY = member.y - half;
    const x = member.x - w - 40;
    const y = Math.max(16, anchorY - 56);
    const endX = x + w;
    const endY = y + Math.round(h * 0.58);
    const ctrlX = anchorX - 48;
    const ctrlY = anchorY - 38;
    const connector = `M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
    return { x, y, w, h, connector };
  }

  if (event.connector === "diagonal-left") {
    const anchorX = member.x - half;
    const anchorY = member.y;
    const x = member.x - half - w - 32;
    const y = member.y - Math.round(h / 2);
    const endX = x + w;
    const endY = y + Math.round(h / 2);
    const connector = `M ${anchorX} ${anchorY} L ${endX} ${endY}`;
    return { x, y, w, h, connector };
  }

  if (event.connector === "diagonal-down") {
    const anchorX = member.x;
    const anchorY = member.y + half;
    const x = member.x - w / 2;
    const y = Math.min(VIEWBOX.h - h - 12, member.y + half + 32);
    const endX = x + w / 2;
    const endY = y;
    const connector = `M ${anchorX} ${anchorY} L ${endX} ${endY}`;
    return { x, y, w, h, connector };
  }

  const x =
    event.side === "left"
      ? member.x - EVENT_CARD.w - 24
      : member.x + half + 20;
  const y = member.y - EVENT_CARD.h - 28 - (event.animOrder % 2) * 12;
  const anchorX = member.x;
  const anchorY = member.y - half;
  const cardCenterX = x + EVENT_CARD.w / 2;
  const cardCenterY = y + EVENT_CARD.h / 2;
  const connector = `M ${anchorX} ${anchorY} L ${anchorX} ${cardCenterY} L ${cardCenterX} ${cardCenterY}`;
  return { x, y, w: EVENT_CARD.w, h: EVENT_CARD.h, connector };
}

const GALLERY_GAP = 72;

/** Reminder badge / phone anchor below Mosheh — kept inside viewBox */
export function getMoshehBadgePosition(genScale: Record<number, number> = {}) {
  const mosheh = TREE_MEMBERS.find((m) => m.id === "mosheh")!;
  const half = nodeHalf(2, genScale[2] ?? 1);
  const phoneH = 212;
  const labelGap = 44;
  const top = mosheh.y + half + labelGap;
  const y = Math.min(top, VIEWBOX.h - phoneH - 16);
  return { x: mosheh.x, y };
}

export function getMoshehPhonePosition(genScale: Record<number, number> = {}) {
  return getMoshehBadgePosition(genScale);
}

export function getGalleryLayout(eventLayout: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const { w: gw, h: gh } = GALLERY_CARD;
  const eventMidY = eventLayout.y + Math.round(eventLayout.h / 2);
  const anchorX = eventLayout.x;
  const anchorY = eventMidY;
  /** Always fully left of event card — never clamp into overlap */
  const x = anchorX - gw - GALLERY_GAP;
  const y = Math.max(12, eventMidY - Math.round(gh / 2));
  const galleryX = x + gw;
  const galleryY = eventMidY;
  const span = anchorX - galleryX;
  const c1x = anchorX - span * 0.22;
  const c2x = galleryX + span * 0.42;
  /** Event (right) → gallery (left) */
  const connector = `M ${anchorX} ${anchorY} C ${c1x} ${anchorY} ${c2x} ${galleryY} ${galleryX} ${galleryY}`;
  return {
    x,
    y,
    w: gw,
    h: gh,
    connector,
    dotStart: { x: anchorX, y: anchorY },
    dotEnd: { x: galleryX, y: galleryY },
  };
}

/** Sarah on screen after main-tree scale+shift (step 7) */
export function getSarahAnchorX(sarahShiftX = 0): number {
  const sarah = TREE_MEMBERS.find((m) => m.id === "sarah")!;
  return sarah.x + sarahShiftX;
}

/** Sarah's shared subtree — 3 rows, centered under her name (step 7) */
export function getGuestTreeMembers(
  genScale: Record<number, number> = {},
  sarahShiftX = 0,
): TreeMember[] {
  const sarah = TREE_MEMBERS.find((m) => m.id === "sarah")!;
  const s0 = genScale[0] ?? 0.55;
  const s1 = genScale[1] ?? 0.55;
  const half1 = nodeHalf(1, s1);
  const half0 = nodeHalf(0, s0);
  const cx = getSarahAnchorX(sarahShiftX);
  const treeW = 220;
  const g0y = sarah.y + half1 + 38 + half0 + 44;
  const g1y = g0y + half0 + 68 + half1;
  const g2y = g1y + half1 + 68 + nodeHalf(2, genScale[2] ?? 1);
  const g1x = spread(3, treeW, cx);
  const g2x = spread(2, 110, cx);

  return [
    {
      id: "guest-aaron",
      name: "Aaron",
      hebrewName: "אהרן",
      avatar: "Ar",
      x: cx - 40,
      y: g0y,
      generation: 0,
      fromStage: 99,
      animOrder: 0,
      spouseId: "guest-miriam",
    },
    {
      id: "guest-miriam",
      name: "Miriam",
      hebrewName: "מרים",
      avatar: "Mi",
      x: cx + 40,
      y: g0y,
      generation: 0,
      fromStage: 99,
      animOrder: 1,
      spouseId: "guest-aaron",
    },
    {
      id: "guest-isaac",
      name: "Isaac",
      hebrewName: "יצחק",
      avatar: "Is",
      x: g1x[0],
      y: g1y,
      generation: 1,
      parentId: "guest-aaron",
      fromStage: 99,
      animOrder: 2,
    },
    {
      id: "guest-ruth",
      name: "Ruth",
      hebrewName: "רות",
      avatar: "Ru",
      x: g1x[1],
      y: g1y,
      generation: 1,
      parentId: "guest-aaron",
      fromStage: 99,
      animOrder: 3,
    },
    {
      id: "guest-samuel",
      name: "Samuel",
      hebrewName: "שמואל",
      avatar: "Sa",
      x: g1x[2],
      y: g1y,
      generation: 1,
      parentId: "guest-aaron",
      fromStage: 99,
      animOrder: 4,
    },
    {
      id: "guest-leah",
      name: "Leah",
      hebrewName: "לאה",
      avatar: "L",
      x: g2x[0],
      y: g2y,
      generation: 2,
      parentId: "guest-isaac",
      fromStage: 99,
      animOrder: 5,
    },
    {
      id: "guest-jacob",
      name: "Jacob",
      hebrewName: "יעקב",
      avatar: "J",
      x: g2x[1],
      y: g2y,
      generation: 2,
      parentId: "guest-isaac",
      fromStage: 99,
      animOrder: 6,
    },
  ];
}

/** HTML overlay anchor beside Sarah (viewBox %) */
export function getSarahConnectRequestPosition(
  genScale: Record<number, number> = {},
  sarahShiftX = 0,
) {
  const sarah = TREE_MEMBERS.find((m) => m.id === "sarah")!;
  const half = nodeHalf(1, genScale[1] ?? 0.55);
  const sx = getSarahAnchorX(sarahShiftX);
  const cardW = 232;
  const gap = 18;
  const cardSvgW = 168;
  const anchorX = sx - half - gap;
  /** زیر اسم سارا، نه روی دایره/نام */
  const y = sarah.y + half + 52;
  const cardH = 108;
  const cardLeft = anchorX - cardSvgW;
  const confirmX = cardLeft + cardSvgW * 0.75;
  const confirmY = y + cardH * 0.84;
  return {
    leftPct: (cardLeft / VIEWBOX.w) * 100,
    topPct: (y / VIEWBOX.h) * 100,
    cardW,
    confirmLeftPct: (confirmX / VIEWBOX.w) * 100,
    confirmTopPct: (confirmY / VIEWBOX.h) * 100,
  };
}

export function getGuestTreeLines(
  genScale: Record<number, number> = {},
  sarahShiftX = 0,
): TreeLine[] {
  const members = getGuestTreeMembers(genScale, sarahShiftX);
  const cx = getSarahAnchorX(sarahShiftX);
  const s0 = genScale[0] ?? 0.55;
  const s1 = genScale[1] ?? 0.55;
  const s2 = genScale[2] ?? 0.55;
  const half0 = nodeHalf(0, s0);
  const half1 = nodeHalf(1, s1);
  const half2 = nodeHalf(2, s2);
  const aaron = members.find((m) => m.id === "guest-aaron")!;
  const miriam = members.find((m) => m.id === "guest-miriam")!;
  const joinY0 = aaron.y + half0;
  const busY1 = busYBetween(aaron.y + half0, members.find((m) => m.id === "guest-isaac")!.y - half1);
  const busY2 = busYBetween(
    members.find((m) => m.id === "guest-isaac")!.y + half1,
    members.find((m) => m.id === "guest-leah")!.y - half2,
  );
  const stemX = cx;
  const g1Kids = members.filter((m) => m.generation === 1);
  const g2Kids = members.filter((m) => m.generation === 2);
  const g1Min = Math.min(...g1Kids.map((k) => k.x));
  const g1Max = Math.max(...g1Kids.map((k) => k.x));
  const g2Min = Math.min(...g2Kids.map((k) => k.x));
  const g2Max = Math.max(...g2Kids.map((k) => k.x));

  const lines: TreeLine[] = [
    {
      id: "guest-sp",
      d: `M ${aaron.x + half0} ${joinY0} L ${miriam.x - half0} ${joinY0}`,
      fromStage: 99,
      row: 0,
      animOrder: 0,
      strokeWidth: 2,
    },
    {
      id: "guest-stem-1",
      d: `M ${stemX} ${joinY0} L ${stemX} ${busY1}`,
      fromStage: 99,
      row: 0,
      animOrder: 1,
    },
    {
      id: "guest-bus-1",
      d: `M ${g1Min} ${busY1} L ${g1Max} ${busY1}`,
      fromStage: 99,
      row: 1,
      animOrder: 2,
    },
    {
      id: "guest-stem-2",
      d: `M ${cx} ${busY1} L ${cx} ${busY2}`,
      fromStage: 99,
      row: 1,
      animOrder: 3,
    },
    {
      id: "guest-bus-2",
      d: `M ${g2Min} ${busY2} L ${g2Max} ${busY2}`,
      fromStage: 99,
      row: 2,
      animOrder: 4,
    },
  ];

  for (const child of g1Kids) {
    lines.push({
      id: `guest-drop-${child.id}`,
      d: `M ${child.x} ${busY1} L ${child.x} ${child.y - half1}`,
      fromStage: 99,
      row: 1,
      animOrder: child.animOrder,
    });
  }
  for (const child of g2Kids) {
    lines.push({
      id: `guest-drop-${child.id}`,
      d: `M ${child.x} ${busY2} L ${child.x} ${child.y - half2}`,
      fromStage: 99,
      row: 2,
      animOrder: child.animOrder,
    });
  }
  return lines;
}

function busYBetween(bottom: number, top: number) {
  return bottom + (top - bottom) * 0.55;
}

/** Vertical stem from bottom of Sarah into her guest subtree */
export function getSarahGuestConnector(
  genScale: Record<number, number> = {},
  sarahShiftX = 0,
): TreeLine {
  const sarah = TREE_MEMBERS.find((m) => m.id === "sarah")!;
  const members = getGuestTreeMembers(genScale, sarahShiftX);
  const aaron = members.find((m) => m.id === "guest-aaron")!;
  const half1 = nodeHalf(1, genScale[1] ?? 0.55);
  const half0 = nodeHalf(0, genScale[0] ?? 0.55);
  const sx = getSarahAnchorX(sarahShiftX);
  const sy = sarah.y + half1 + 30;
  const gy = aaron.y - half0;
  return {
    id: "connect-sarah-guest",
    d: `M ${sx} ${sy} L ${sx} ${gy}`,
    fromStage: 99,
    row: 0,
    animOrder: 0,
    strokeWidth: 2.5,
  };
}
