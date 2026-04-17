import prisma from "@/app/lib/prisma";
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { article } = await req.json();
    const { title, content } = article;

    if (!title || !content) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 },
      );
    }

    const [summaryRes, quizRes] = await Promise.all([
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Provide a concise 3-4 sentence summary of this article (${title}): ${content}`,
          },
        ],
      }),
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Generate 5 multiple choice questions based on this article (${title}): ${content}. 
              Return ONLY a valid JSON array with no markdown:
              [
                {
                  "question": "Question text here",
                  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                  "answer": "Option 1"
                }
              ]
              The "answer" field MUST match the exact text of the correct option.`,
          },
        ],
      }),
    ]);

    const summary = summaryRes.choices[0]?.message?.content ?? "";
    const quizRaw = quizRes.choices[0]?.message?.content ?? "";

    const jsonMatch = quizRaw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Groq raw response:", quizRaw);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 },
      );
    }

    const quizzes: {
      question: string;
      options: string[];
      answer: string;
      summary: string;
    }[] = JSON.parse(jsonMatch[0]);

    const created = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        quizzes: {
          create: quizzes.map((q) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
      include: { quizzes: true },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
