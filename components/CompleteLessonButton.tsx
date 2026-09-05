"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteLessonButton({
  lessonId,
  initiallyComplete,
  signedIn,
}: {
  lessonId: string;
  initiallyComplete: boolean;
  signedIn: boolean;
}) {
  const router = useRouter();
  const [done, setDone] = useState(initiallyComplete);
  const [loading, setLoading] = useState(false);

  if (!signedIn) {
    return (
      <a href="/sign-in" className="btn btn-outline">
        Sign in to track progress
      </a>
    );
  }

  async function handleClick() {
    setLoading(true);
    const res = await fetch(`/api/lessons/${lessonId}/complete`, { method: "POST" });
    if (res.ok) {
      setDone(true);
      router.refresh();
    }
    setLoading(false);
  }

  if (done) {
    return (
      <span className="tag done" style={{ padding: "10px 18px", fontSize: "0.85rem" }}>
        ✓ Completed
      </span>
    );
  }

  return (
    <button className="btn btn-primary" onClick={handleClick} disabled={loading}>
      {loading ? "Marking…" : "Mark as Complete"}
    </button>
  );
}
