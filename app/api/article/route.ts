import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, content } = body;

    const article = await prisma.article.create({
      data: { title, content },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
};
export const GET = async () => {
  const articles = await prisma.article.findMany();

  return NextResponse.json(articles);
};
