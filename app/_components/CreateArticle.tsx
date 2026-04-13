"use client";

import { useState } from "react";
import { createArticle } from "../lib/articles/create-article";

export const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const onCreateArticle = async () => {
    await createArticle(article);
  };
  return <button onClick={onCreateArticle}>create</button>;
};
