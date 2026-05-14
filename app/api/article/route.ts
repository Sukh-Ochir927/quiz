import prisma from "@/app/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  const user = await currentUser();

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      email: user?.primaryEmailAddress?.emailAddress ?? `${userId}@clerk.local`,
      name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null,
    },
    create: {
      id: userId,
      email: user?.primaryEmailAddress?.emailAddress ?? `${userId}@clerk.local`,
      name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null,
    },
  });

  const article = await prisma.article.create({
    data: { title, content, userId },
  });

  return Response.json(article, { status: 201 });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const articles = await prisma.article.findMany({
    where: { userId },
  });

  return Response.json(articles);
}
