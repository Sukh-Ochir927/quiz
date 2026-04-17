import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  params: Promise<{ articleId: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { articleId } = await params;

  const article = await prisma.article.findUnique({
    where: { id: Number(articleId) },
    include: { quizzes: true },
  });

  if (!article) return notFound();

  return (
    <div className="flex flex-1 items-start justify-center p-8">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            Article Quiz Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {article.summary && (
            <div className="space-y-2 border-b pb-6">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <FileText className="w-3.5 h-3.5" />
                Summarized content
              </div>
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <FileText className="w-3.5 h-3.5" />
              Article Content
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {article.content}
            </p>
          </div>

          <div className="pt-2">
            <Link href={`/quiz/${article.id}`}>
              <Button>Take a quiz</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
