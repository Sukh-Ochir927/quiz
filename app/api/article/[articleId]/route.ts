import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) => {
  try {
    const { articleId } = await params;
    const article = await prisma.article.findUnique({
      where: { id: Number(articleId) },
    });

    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
};
    