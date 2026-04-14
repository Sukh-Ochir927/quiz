"use client";

import { ChangeEventHandler, useState } from "react";
import { createArticle } from "../lib/articles/create-article";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateQuiz } from "../lib/quizzes/quiz-generator";

export const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const onCreateArticle = async () => {
    await createArticle(article);
    const question = await generateQuiz(article);
    console.log("question", question);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };
  console.log(article);

  return (
    <div>
      <h1>Article Quiz Generator</h1>
      <div>
        <label htmlFor="Article Title">Article Title</label>
        <Textarea
          id="title"
          name="title"
          onChange={handleChange}
          value={article.title}
          placeholder="Enter a title for your article..."
          className="w-2/4"
        />
      </div>
      <div>
        <label htmlFor="Article Content">Article Content</label>
        <Textarea
          id="content"
          name="content"
          onChange={handleChange}
          value={article.content}
          placeholder="Paste your article content here..."
          className="w-2/4"
        />
      </div>
      <Button onClick={onCreateArticle}>Generate</Button>
    </div>
  );
};
