export const generateQuiz = async (articleId: number): Promise<void> => {
  await fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleId }),
  });
};
