"use client";

import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, FileText } from "lucide-react";

export const CreateArticle = () => {
  const router = useRouter();
  const [article, setArticle] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onCreateArticle = async () => {
    if (!article.title || !article.content) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article }),
      });

      if (!res.ok) throw new Error("Failed to generate quiz");

      const data = await res.json();
      router.push(`/quiz/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const isDisabled =
    !article.title.trim() || !article.content.trim() || isLoading;

  return (
    <div className="flex flex-1 items-start justify-center p-8">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            Article Quiz Generator
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Paste your article below to generate a summary and quiz questions.
            Your articles will be saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              Article Title
            </Label>
            <Input
              id="title"
              name="title"
              value={article.title}
              onChange={handleInputChange}
              placeholder="Enter a title for your article..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              Article Content
            </Label>
            <Textarea
              id="content"
              name="content"
              value={article.content}
              onChange={handleTextareaChange}
              placeholder="Paste your article content here..."
              className="w-full min-h-35 resize-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button onClick={onCreateArticle} disabled={isDisabled}>
              {isLoading ? "Generating..." : "Generate summary"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
