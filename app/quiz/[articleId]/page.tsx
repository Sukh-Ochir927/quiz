"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  X,
  Sparkles,
  RotateCcw,
  LogOut,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { articleId } = useParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz/${articleId}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const normalized = data.map((q: Question) => ({
          ...q,
          options: Array.isArray(q.options) ? q.options : [],
        }));
        setQuestions(normalized);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [articleId]);

  const currentQuestion = questions[current];
  const total = questions.length;
  const score = answers.filter((a, i) => a === questions[i]?.answer).length;

  const handleNext = () => {
    const newAnswers = [...answers, selected!];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-muted-foreground text-sm">Loading quiz...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-muted-foreground text-sm">
          No quiz questions found.
        </p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-1 items-start justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="mb-4">
            <div className="flex items-center gap-2 font-semibold text-base">
              <Sparkles className="w-5 h-5" />
              Quiz completed
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Let&apos;s see what you did
            </p>
          </div>

          <div className="border rounded-lg bg-background shadow-sm p-5 space-y-4">
            <p className="font-semibold text-base">
              Your score: <span className="text-foreground">{score}</span>
              <span className="text-muted-foreground font-normal">
                / {total}
              </span>
            </p>

            <div className="space-y-3">
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const correct = userAnswer === q.answer;
                return (
                  <div key={q.id} className="text-sm space-y-0.5">
                    <div className="flex items-start gap-2">
                      {correct ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      )}
                      <span className="text-muted-foreground">
                        {i + 1}. {q.question}
                      </span>
                    </div>
                    <div className="pl-6 space-y-0.5">
                      <p className="text-foreground font-medium">
                        Your answer: {userAnswer}
                      </p>
                      {!correct && (
                        <p className="text-green-600 text-xs">
                          Correct: {q.answer}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestart}
                className="gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart quiz
              </Button>
              <Button
                size="sm"
                onClick={() => router.push(`/article/${articleId}`)}
                className="gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Save and leave
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-start justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-base">
              <Sparkles className="w-5 h-5" />
              Quick test
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Take a quick test about your knowledge from your content
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="border rounded px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="border rounded-lg bg-background shadow-sm p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <p className="font-medium text-sm">{currentQuestion.question}</p>
            <span className="text-muted-foreground text-sm shrink-0">
              <span className="font-semibold text-foreground">
                {current + 1}
              </span>{" "}
              / {total}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`text-sm px-3 py-3 rounded-lg border transition-colors text-center
                  ${
                    selected === option
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background hover:bg-accent border-border"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selected && (
            <div className="flex justify-end pt-1">
              <Button size="sm" onClick={handleNext}>
                {current + 1 < total ? "Next" : "Finish"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
