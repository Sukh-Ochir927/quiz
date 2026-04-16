import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { title, content } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Generate 5 multiple choice questions based on this article (${title}): ${content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
  });

  const text = response.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  const quiz = JSON.parse(clean);

  return NextResponse.json(quiz, { status: 200 });
};
