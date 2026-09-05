"use client";

import { useState } from "react";
import Link from "next/link";

type Choice = { id: string; text: string };
type Question = { id: string; prompt: string; choices: Choice[] };

export default function QuizForm({
  quizId,
  questions,
  lessonId,
}: {
  quizId: string;
  questions: Question[];
  lessonId: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    totalPoints: number;
    results: Record<string, boolean>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    if (res.status === 401) {
      setError("You need to sign in before submitting a quiz.");
      setSubmitting(false);
      return;
    }

    if (!res.ok) {
      setError("Something went wrong submitting your quiz.");
      setSubmitting(false);
      return;
    }

    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  return (
    <div>
      {error && <div className="form-error">{error}</div>}

      {questions.map((question, qIndex) => {
        const selected = answers[question.id];
        const questionResult = result?.results[question.id];

        return (
          <div className="quiz-question" key={question.id}>
            <p style={{ color: "var(--text)", fontWeight: 700, marginBottom: 12 }}>
              {qIndex + 1}. {question.prompt}
            </p>
            {question.choices.map((choice) => {
              const isSelected = selected === choice.id;
              let className = "quiz-choice";
              if (result) {
                if (isSelected && questionResult) className += " correct";
                else if (isSelected && !questionResult) className += " incorrect";
              } else if (isSelected) {
                className += " selected";
              }

              return (
                <label className={className} key={choice.id}>
                  <input
                    type="radio"
                    name={question.id}
                    value={choice.id}
                    checked={isSelected}
                    disabled={!!result}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [question.id]: choice.id }))
                    }
                  />
                  {choice.text}
                </label>
              );
            })}
          </div>
        );
      })}

      {!result ? (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
      ) : (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <h2>
            You scored {result.score} / {result.totalPoints}
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 16 }}>
            <Link href={`/lessons/${lessonId}`} className="btn btn-outline">
              Back to Lesson
            </Link>
            <Link href="/dashboard" className="btn btn-primary">
              View Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
