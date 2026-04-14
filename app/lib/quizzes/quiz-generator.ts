type QuizGeneratorProps = {
  title: string;
  content: string;
};

export const generateQuiz = async ({ title, content }: QuizGeneratorProps) => {
  const response = await fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error(`Quiz generation failed: ${response.statusText}`);
  }

  return response.json();
};
