// ============================================================================
// PSYCHOMETRIC ITEM RESPONSE THEORY (IRT) ENGINE — Rasch / 1PL & 2PL Models
//
// Replaces heuristic streak-based progression with true psychometric estimation:
//   - Student ability: \theta \in [-3.0, +3.0], initialized to 0.0 (Average)
//   - Item difficulty: b \in [-3.0, +3.0]
//   - Item discrimination: a (default 1.0)
//   - Logistic success probability: P(\theta) = 1 / (1 + e^(-a*(\theta - b)))
//   - Fisher Information: I(\theta) = a^2 * P * (1 - P)
// ============================================================================

export interface IRTItem {
  id: string;
  topicId: string;
  difficulty: number; // b parameter (-2.5 to +2.5)
  discrimination?: number; // a parameter (default 1.0)
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  microTheory?: string;
  misconceptions?: Record<string, string>; // maps wrong option to specific conceptual error
}

export interface StudentIRTProfile {
  studentId?: string;
  rollNo?: string;
  section?: string;
  theta: number; // Current estimated ability (-3.0 to +3.0)
  standardError: number; // Uncertainty in ability
  itemsAttempted: number;
  correctCount: number;
  history: Array<{
    itemId: string;
    difficulty: number;
    correct: boolean;
    thetaAfter: number;
    timeTakenSeconds?: number;
  }>;
}

export const INITIAL_THETA = -2.0; // Level 1 (Foundation / Simple) starting point
export const INITIAL_SE = 1.0;
export const DEFAULT_GUESSING_C = 0.20; // 3PL lower asymptote for 4-option MCQs

/**
 * Probability of correct response under the logistic 3PL/2PL/Rasch model:
 * P(theta) = c + (1 - c) / (1 + e^(-a*(theta - b)))
 */
export function calculateProbability(
  theta: number,
  b: number,
  a: number = 1.0,
  c: number = DEFAULT_GUESSING_C
): number {
  const z = a * (theta - b);
  if (z > 35) return 0.99999;
  if (z < -35) return c + 0.00001;
  const logistic = 1 / (1 + Math.exp(-z));
  return c + (1 - c) * logistic;
}

/**
 * Fisher Information Function for an item at ability level theta under 3PL model:
 * I(theta) = a^2 * ((P - c)^2 / (1 - c)^2) * ((1 - P) / P)
 */
export function calculateItemInformation(
  theta: number,
  b: number,
  a: number = 1.0,
  c: number = DEFAULT_GUESSING_C
): number {
  const p = calculateProbability(theta, b, a, c);
  if (p <= c || p >= 1.0) return 0.001;
  const pMinusC = (p - c) / (1 - c);
  return Math.max(0.01, a * a * (pMinusC * pMinusC) * ((1 - p) / p));
}

/**
 * Calculates 95% Confidence Interval for latent ability: theta +- 1.96 * SE
 */
export function getThetaConfidenceInterval(
  theta: number,
  se: number
): { lower: number; upper: number; formatted: string } {
  const margin = 1.96 * se;
  const lower = Number((theta - margin).toFixed(2));
  const upper = Number((theta + margin).toFixed(2));
  return {
    lower,
    upper,
    formatted: `[${lower >= 0 ? "+" : ""}${lower}, ${upper >= 0 ? "+" : ""}${upper}]`,
  };
}

/**
 * Updates student ability (theta) using Online Bayesian / Maximum Information update.
 * As more items are answered, step size naturally cools down, preventing jitter.
 */
export function updateStudentAbility(
  currentProfile: StudentIRTProfile,
  item: IRTItem,
  isCorrect: boolean,
  timeTakenSeconds?: number
): StudentIRTProfile {
  const a = item.discrimination || 1.0;
  const b = item.difficulty;
  const p = calculateProbability(currentProfile.theta, b, a);
  const u = isCorrect ? 1.0 : 0.0;

  // Measurement information gathered so far
  const itemInfo = calculateItemInformation(currentProfile.theta, b, a);
  const currentVariance = Math.max(0.04, Math.pow(currentProfile.standardError, 2));

  // Bayesian update rule: Delta theta proportional to residual (u - p) and current uncertainty
  // Step dampener prevents wild swings from lucky guesses
  const dampener = Math.min(1.0, 1.5 / Math.sqrt(currentProfile.itemsAttempted + 1));
  const deltaTheta = (u - p) * Math.sqrt(currentVariance) * dampener;

  // Clamp ability to valid psychometric scale [-3.0, +3.0]
  const newTheta = Math.max(-3.0, Math.min(3.0, currentProfile.theta + deltaTheta));

  // Posterior Standard Error decreases with information gained
  const newVariance = 1 / (1 / currentVariance + itemInfo);
  const newSE = Math.max(0.2, Math.sqrt(newVariance));

  const itemsAttempted = currentProfile.itemsAttempted + 1;
  const correctCount = currentProfile.correctCount + (isCorrect ? 1 : 0);

  const history = [
    ...currentProfile.history,
    {
      itemId: item.id,
      difficulty: b,
      correct: isCorrect,
      thetaAfter: Number(newTheta.toFixed(3)),
      timeTakenSeconds,
    },
  ];

  return {
    studentId: currentProfile.studentId,
    rollNo: currentProfile.rollNo,
    section: currentProfile.section,
    theta: Number(newTheta.toFixed(3)),
    standardError: Number(newSE.toFixed(3)),
    itemsAttempted,
    correctCount,
    history,
  };
}

export interface ItemLevelInfo {
  level: 1 | 2 | 3 | 4;
  label: string;
  badge: string;
  color: "emerald" | "amber" | "indigo" | "purple";
  description: string;
}

/**
 * Maps psychometric difficulty parameter b to a student-friendly Level (1 to 4).
 * Level 1: Foundation (सरल) -> b < -1.1
 * Level 2: Intermediate (मध्यम) -> -1.1 <= b < 0.2
 * Level 3: Advanced (कठिन) -> 0.2 <= b < 1.5
 * Level 4: Olympiad (चुनौतीपूर्ण) -> b >= 1.5
 */
export function getItemLevel(difficulty: number): ItemLevelInfo {
  if (difficulty < -1.1) {
    return {
      level: 1,
      label: "Foundation",
      badge: "Level 1: Basic (सरल)",
      color: "emerald",
      description: "Fundamental definitions & core properties",
    };
  }
  if (difficulty < 0.2) {
    return {
      level: 2,
      label: "Intermediate",
      badge: "Level 2: Moderate (मध्यम)",
      color: "amber",
      description: "Standard calculations & core applications",
    };
  }
  if (difficulty < 1.5) {
    return {
      level: 3,
      label: "Advanced",
      badge: "Level 3: Advanced (कठिन)",
      color: "indigo",
      description: "Multi-step methods & applied word problems",
    };
  }
  return {
    level: 4,
    label: "Olympiad",
    badge: "Level 4: Olympiad (चुनौतीपूर्ण)",
    color: "purple",
    description: "Deep conceptual reasoning & competition challenges",
  };
}

/**
 * Computerized Adaptive Testing (CAT) Item Selector:
 * Selects the optimal next question maximizing Fisher Information (closest to student ability),
 * keeping the student in their Zone of Proximal Development (ZPD).
 *
 * For fresh sessions (itemsAttempted === 0), it strictly starts with Level 1 (easy / simple)
 * to build confidence before escalating difficulty.
 */
export function selectNextOptimalItem(
  theta: number,
  candidateItems: IRTItem[],
  seenItemIds: Set<string>,
  itemsAttempted: number = 0
): IRTItem | null {
  const unseen = candidateItems.filter((it) => !seenItemIds.has(it.id));
  if (unseen.length === 0) return null;

  // Level 1 Scaffold: For the very first question, always start simple (b <= -1.1)
  if (itemsAttempted === 0) {
    const level1Items = unseen.filter((it) => it.difficulty <= -1.1);
    if (level1Items.length > 0) {
      const sorted = [...level1Items].sort((a, b) => a.difficulty - b.difficulty);
      return sorted[0]; // Start with the easiest foundational item
    }
  }

  // Rank candidate questions by proximity to student ability |b - theta|
  // with a small probabilistic temperature (0.05) to prevent identical sequence repetition
  const ranked = unseen
    .map((item) => {
      const dist = Math.abs(item.difficulty - theta);
      const info = calculateItemInformation(theta, item.difficulty, item.discrimination || 1.0);
      const score = info - Math.random() * 0.05; // slight stochastic tie-breaker
      return { item, dist, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0].item;
}

/**
 * Converts latent ability theta (-3.0 to +3.0) to a user-friendly mastery percentage (0% to 100%)
 * using the standard normal ogive / sigmoid transformation.
 */
export function thetaToMasteryPercentage(theta: number): number {
  // Sigmoid mapping centered at theta = 0 (50%)
  const pct = (1 / (1 + Math.exp(-1.1 * theta))) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}

/**
 * Returns pedagogical mastery badge based on IRT theta score.
 */
export function getMasteryTier(theta: number): {
  label: string;
  badge: string;
  color: string;
} {
  if (theta >= 1.8) return { label: "Mastered", badge: "🏆 Mastered", color: "emerald" };
  if (theta >= 0.8) return { label: "Advanced", badge: "🟢 Advanced", color: "emerald" };
  if (theta >= 0.0) return { label: "Proficient", badge: "🟡 Proficient", color: "amber" };
  if (theta >= -1.0) return { label: "Developing", badge: "🟠 Developing", color: "amber" };
  return { label: "Foundational", badge: "🔴 Foundation Required", color: "rose" };
}
