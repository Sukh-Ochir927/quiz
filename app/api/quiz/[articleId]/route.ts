import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) => {
  try {
    const { articleId } = await params;

    const questions = await prisma.quiz.findMany({
      where: { articleId: Number(articleId) },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Get quiz error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
