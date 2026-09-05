"use client";

import { useEffect, useRef, useState } from "react";

type Question = {
  id: string;
  category: "BEHAVIORAL" | "TECHNICAL";
  prompt: string;
  sampleAnswer: string;
  tips: string;
};

export default function InterviewPractice({ questions }: { questions: Question[] }) {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = questions[index];

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function startTimer() {
    setRunning(true);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopTimer() {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function nextQuestion() {
    stopTimer();
    setRevealed(false);
    setSeconds(0);
    setIndex((i) => (i + 1) % questions.length);
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  if (!question) {
    return <p style={{ textAlign: "center" }}>No questions available yet.</p>;
  }

  return (
    <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
      <div className="tag-row" style={{ marginBottom: 16 }}>
        <span className="tag">{question.category}</span>
        <span className="tag">
          Question {index + 1} of {questions.length}
        </span>
      </div>

      <h3>{question.prompt}</h3>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "2rem",
          color: running ? "var(--accent)" : "var(--muted)",
          margin: "20px 0",
        }}
      >
        {minutes}:{secs}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {!running ? (
          <button className="btn btn-primary" onClick={startTimer}>
            Start Timer &amp; Answer Out Loud
          </button>
        ) : (
          <button className="btn btn-outline" onClick={stopTimer}>
            Stop Timer
          </button>
        )}
        <button className="btn btn-outline" onClick={() => setRevealed((r) => !r)}>
          {revealed ? "Hide" : "Reveal"} Sample Answer &amp; Tips
        </button>
        <button className="btn btn-outline" onClick={nextQuestion}>
          Next Question →
        </button>
      </div>

      {revealed && (
        <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <p style={{ color: "var(--accent-2)", fontWeight: 700, marginBottom: 6 }}>Sample Answer</p>
          <p>{question.sampleAnswer}</p>
          <p style={{ color: "var(--accent-2)", fontWeight: 700, marginBottom: 6 }}>Interview Tips</p>
          <p>{question.tips}</p>
        </div>
      )}
    </div>
  );
}
