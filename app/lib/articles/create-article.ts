export const createArticle = async (article: {
  title: string;
  content: string;
}): Promise<{ id: number; title: string; content: string }> => {
  const res = await fetch("/api/article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });

  if (!res.ok) {
    throw new Error("Failed to create article");
  }

  return res.json();
};
