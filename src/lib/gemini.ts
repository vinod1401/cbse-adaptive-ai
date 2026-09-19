// ============================================================================
// GEMINI SOCRATIC AI TUTOR — Google GenAI SDK (Zero-Cost Free Tier)
// Model: gemini-3.8-flash (or gemini-flash-latest) via @google/genai
// ============================================================================

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const client = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface SocraticHintRequest {
  topic: string;
  questionText: string;
  options: string[];
  hintLevel: 1 | 2 | 3;
  selectedWrongAnswer?: string;
}

/**
 * Generates an intelligent, step-by-step Socratic hint without giving away the answer.
 */
export async function generateSocraticHint(params: SocraticHintRequest): Promise<string> {
  const { topic, questionText, options, hintLevel, selectedWrongAnswer } = params;

  // Fallback if no API key is set yet (ensures zero crashes)
  if (!client) {
    if (selectedWrongAnswer) {
      return `💡 Notice what happened when you selected ${selectedWrongAnswer}. Remember the core rule in ${topic}: check if your signs or denominators need careful adjustment first!`;
    }
    const hints = [
      "💡 Hint 1: What is the fundamental formula or definition needed to start this problem?",
      "💡 Hint 2: Try isolating the variable step-by-step or finding the common denominator.",
      "💡 Hint 3: Check your sign flips and verify your arithmetic carefully.",
    ];
    return hints[hintLevel - 1] || hints[0];
  }

  const systemInstruction = `
You are an encouraging, expert CBSE Class 8 Math & Science Socratic Tutor.
STRICT RULES:
1. NEVER reveal the correct answer or the correct option letter.
2. At Hint Level 1: Ask a guiding conceptual question to spark the student's memory.
3. At Hint Level 2: Point to the specific rule/formula without performing the calculation.
4. At Hint Level 3: Walk through the first half of the calculation, leaving the final step for the student.
5. Keep answers friendly, brief (under 3 sentences), and use KaTeX math formatting ($...$) for math expressions.
`.trim();

  const prompt = `
Topic: ${topic}
Question: ${questionText}
Options: ${options.join(", ")}
${selectedWrongAnswer ? `Student just chose incorrect option: ${selectedWrongAnswer}` : ""}
Current Requested Hint Level: ${hintLevel} of 3

Provide the Socratic Hint now:
`.trim();

  try {
    const interaction = await client.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,
      tools: [],
      // System instructions are interaction-scoped in current SDK
    });

    let hint = interaction.output_text?.trim() || "Think carefully about the core properties of this concept. What is the first step?";
    
    // Safety Guardrail (Finding 9): Ensure the model does not inadvertently blurt out a direct answer
    for (const opt of options) {
      const directLeak = new RegExp(`(answer\\s+is|correct\\s+option\\s+is|choose)\\s+["']?${opt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?`, "i");
      if (directLeak.test(hint)) {
        hint = "💡 Consider the underlying rule for this topic. Which fundamental formula or relation applies here?";
        break;
      }
    }

    return hint;
  } catch (error) {
    console.error("Gemini API Tutor Error:", error);
    return "💡 Concept Tip: Break the equation down step-by-step. Remember that what you do to one side must be done to the other!";
  }
}

export interface DynamicQuestionParams {
  topicId: string;
  topicTitle: string;
  subject: string;
  chapter: string;
  targetDifficulty: number; // theta around [-2.5, +2.5]
  subtopics: string[];
}

/**
 * Infinite Mode AI Question Generator (Zero-Cost Gemini Free Tier)
 * Dynamically synthesizes fresh CBSE Class 8 questions tailored to student theta
 * when the pre-calibrated bank has been fully exhausted in an extended session.
 */
export async function generateDynamicAdaptiveQuestion(params: DynamicQuestionParams): Promise<any | null> {
  if (!client) return null;

  const prompt = `
Generate 1 unique, high-quality multiple choice question for CBSE Class 8 students.
Subject: ${params.subject}
Chapter: ${params.chapter}
Topic: ${params.topicTitle}
Subtopics: ${params.subtopics.join(", ")}
Target Psychometric Difficulty (b-parameter on scale -2.5 to +2.5): ${params.targetDifficulty.toFixed(2)}

Requirements:
1. Provide exactly 4 options.
2. Clearly identify the single correct answer (must match one of the 4 options verbatim).
3. Provide a step-by-step pedagogical explanation.
4. Provide misconceptions mapping for wrong options.
5. Use KaTeX math syntax ($...$) for mathematical or scientific formulas where appropriate.
6. Output in STRICT JSON format matching this schema:
{
  "text": "Question statement here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Exact matching option string",
  "explanation": "Clear step-by-step solution",
  "misconceptions": {
    "Wrong option string": "Why this is a misconception"
  }
}
Return ONLY valid raw JSON without markdown backticks.
`.trim();

  try {
    const interaction = await client.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,
      tools: [],
    });

    const text = interaction.output_text?.trim() || "";
    const cleanJson = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(cleanJson);
    if (parsed.text && Array.isArray(parsed.options) && parsed.correctAnswer) {
      return {
        id: `dyn-${params.topicId}-${Date.now()}`,
        topicId: params.topicId,
        difficulty: params.targetDifficulty,
        text: parsed.text,
        options: parsed.options,
        correctAnswer: parsed.correctAnswer,
        explanation: parsed.explanation || "Correct answer based on CBSE Class 8 curriculum concepts.",
        misconceptions: parsed.misconceptions || {},
      };
    }
    return null;
  } catch (error) {
    console.warn("Gemini dynamic question generation fallback:", error);
    return null;
  }
}

