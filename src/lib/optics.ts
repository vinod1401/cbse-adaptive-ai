// ============================================================================
// RAY OPTICS ENGINE FOR THE 3D LIGHT LAB
// Mirror / thin-lens formula with the "real is positive" convention:
//   1/do + 1/di = 1/f   (concave mirror & convex lens: f > 0)
// The optical element sits at x = 0 on the principal axis, the object stands
// on the left at x = -do. Mirror images form at x = -di, lens images at x = di.
// ============================================================================

export type OpticMode = "concave-mirror" | "convex-mirror" | "convex-lens" | "concave-lens";

export const FOCAL_LENGTH = 15;
export const OBJECT_HEIGHT = 6;
export const APERTURE = 14;

export interface Point2 {
  x: number;
  y: number;
}

export interface Ray {
  /** Object tip → element → far end, the path light actually travels. */
  path: Point2[];
  /** Dashed back-extension to a virtual image, if any. */
  extension?: [Point2, Point2];
  color: string;
}

export interface OpticsResult {
  isMirror: boolean;
  f: number;
  objectDistance: number;
  atInfinity: boolean;
  imageDistance: number;
  imageX: number;
  magnification: number;
  imageHeight: number;
  real: boolean;
  rays: Ray[];
}

export const MODE_LABELS: Record<OpticMode, { en: string; hi: string }> = {
  "concave-mirror": { en: "Concave Mirror", hi: "अवतल दर्पण" },
  "convex-mirror": { en: "Convex Mirror", hi: "उत्तल दर्पण" },
  "convex-lens": { en: "Convex Lens", hi: "उत्तल लेंस" },
  "concave-lens": { en: "Concave Lens", hi: "अवतल लेंस" },
};

export const RAY_COLORS = ["#f87171", "#60a5fa", "#facc15"];

/** Sag of the spherical mirror surface at height y (mirror radius R = 2F). */
export function mirrorSag(y: number): number {
  const R = 2 * FOCAL_LENGTH;
  return R - Math.sqrt(Math.max(R * R - y * y, 0));
}

function norm(v: Point2): Point2 {
  const l = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / l, y: v.y / l };
}

export function computeOptics(mode: OpticMode, objectDistance: number): OpticsResult {
  const isMirror = mode.endsWith("mirror");
  const f = mode === "concave-mirror" || mode === "convex-lens" ? FOCAL_LENGTH : -FOCAL_LENGTH;
  const d = objectDistance;
  const H = OBJECT_HEIGHT;
  const atInfinity = Math.abs(d - f) < 0.25;

  const imageDistance = atInfinity ? Infinity : (f * d) / (d - f);
  const magnification = atInfinity ? Infinity : -imageDistance / d;
  const imageHeight = magnification * H;
  const imageX = isMirror ? -imageDistance : imageDistance;
  const real = imageDistance > 0;

  // Outgoing light travels to -x for a mirror and to +x for a lens.
  const outSign = isMirror ? -1 : 1;
  const hitX = (y: number) => (isMirror ? (f > 0 ? -mirrorSag(y) : mirrorSag(y)) : 0);
  const tip: Point2 = { x: -d, y: H };

  // Each standard ray: the height where it meets the element and its outgoing direction.
  const standard: { y: number; dir: Point2 }[] = [];

  // 1. Parallel to the axis → passes through (or appears to come from) the focus.
  let d1: Point2 = { x: outSign * f, y: -H };
  if (Math.sign(d1.x) !== outSign) d1 = { x: -d1.x, y: -d1.y };
  standard.push({ y: H, dir: norm(d1) });

  // 2. Mirror: hits the pole and reflects symmetrically. Lens: through the optical centre undeviated.
  standard.push({ y: 0, dir: norm({ x: outSign * d, y: -H }) });

  // 3. Aimed at the focus on the incoming side (far side for diverging elements) → emerges parallel.
  if (!atInfinity) {
    const y3 = H - (d * H) / (d - f);
    if (Math.abs(y3) <= APERTURE) standard.push({ y: y3, dir: { x: outSign, y: 0 } });
  }

  const farX = isMirror
    ? Math.min(-75, real && !atInfinity ? imageX - 15 : -75)
    : Math.max(75, real && !atInfinity ? imageX + 15 : 75);

  const rays: Ray[] = standard.map(({ y, dir }, i) => {
    const hit: Point2 = { x: hitX(y), y };
    const t = Math.min((farX - hit.x) / dir.x, 220);
    const end: Point2 = { x: hit.x + dir.x * t, y: hit.y + dir.y * t };
    const ray: Ray = { path: [tip, hit, end], color: RAY_COLORS[i] };
    if (!atInfinity && !real) {
      const back = (imageX - hit.x) / -dir.x;
      ray.extension = [hit, { x: hit.x - dir.x * back, y: hit.y - dir.y * back }];
    }
    return ray;
  });

  return {
    isMirror,
    f,
    objectDistance: d,
    atInfinity,
    imageDistance,
    imageX,
    magnification,
    imageHeight,
    real,
    rays,
  };
}

/** Textbook (NCERT) description of object & image position for the current setup. */
export function describeCase(mode: OpticMode, d: number): { object: string; image: string } {
  const F = FOCAL_LENGTH;
  const near = (a: number, b: number) => Math.abs(a - b) <= 0.5;
  const isMirror = mode.endsWith("mirror");

  if (mode === "convex-mirror") {
    return { object: "दर्पण के सामने कहीं भी", image: "दर्पण के पीछे, P और F के बीच" };
  }
  if (mode === "concave-lens") {
    return { object: "लेंस के सामने कहीं भी", image: "उसी ओर, F₁ और O के बीच" };
  }

  const [C1, C2, Fa, Fb, P] = isMirror ? ["C", "C", "F", "F", "P"] : ["2F₁", "2F₂", "F₁", "F₂", "O"];
  if (near(d, 2 * F)) return { object: `${C1} पर`, image: `${C2} पर` };
  if (d > 2 * F) return { object: `${C1} से परे`, image: `${Fb} और ${C2} के बीच` };
  if (near(d, F)) return { object: `${Fa} पर`, image: "अनंत (infinity) पर" };
  if (d > F) return { object: `${Fa} और ${C1} के बीच`, image: `${C2} से परे` };
  return {
    object: `${Fa} और ${P} के बीच`,
    image: isMirror ? "दर्पण के पीछे" : "वस्तु की ओर ही (same side)",
  };
}
