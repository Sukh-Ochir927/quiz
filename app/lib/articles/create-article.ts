import { Article } from "./type/types";

export const createArticle = async (article: Article) => {
  const response = await fetch("/api/article", {
    method: "POST",
    body: JSON.stringify(article),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);

  return response;
};
