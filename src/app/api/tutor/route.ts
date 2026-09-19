// ============================================================================
// GEMINI SOCRATIC AI TUTOR API ROUTE
// ============================================================================

import { NextResponse } from "next/server";
import { generateSocraticHint } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, questionText, options, hintLevel = 1, selectedWrongAnswer } = body;

    if (!topic || !questionText || !options) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const hint = await generateSocraticHint({
      topic,
      questionText,
      options,
      hintLevel: Number(hintLevel) as 1 | 2 | 3,
      selectedWrongAnswer,
    });

    return NextResponse.json({
      hint,
      hintLevel,
      maxHints: 3,
    });
  } catch (error) {
    console.error("Tutor API Route Error:", error);
    return NextResponse.json(
      { hint: "💡 Focus on the main formula. What happens when you perform the inverse operation?" },
      { status: 200 }
    );
  }
}
