"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CommentItem = {
  id: string;
  body: string;
  createdAt: string;
  user: { name: string };
};

export default function LessonComments({
  lessonId,
  initialComments,
  signedIn,
}: {
  lessonId: string;
  initialComments: CommentItem[];
  signedIn: boolean;
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    setError(null);

    const res = await fetch(`/api/lessons/${lessonId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Couldn't post comment");
      setPosting(false);
      return;
    }

    setComments((prev) => [data.comment, ...prev]);
    setText("");
    setPosting(false);
    router.refresh();
  }

  return (
    <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
      <h3>Discussion ({comments.length})</h3>
      <p>Ask questions, share what helped, or connect with other learners on this lesson.</p>

      {signedIn ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          {error && <div className="form-error">{error}</div>}
          <div className="field">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share a thought or ask a question..."
              style={{
                width: "100%",
                minHeight: 90,
                fontFamily: "var(--font-body)",
                background: "var(--bg-alt)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: 12,
              }}
            />
          </div>
          <button className="btn btn-primary" disabled={posting}>
            {posting ? "Posting…" : "Post Comment"}
          </button>
        </form>
      ) : (
        <p>
          <a href="/sign-in">Sign in</a> to join the discussion.
        </p>
      )}

      {comments.map((c) => (
        <div key={c.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--accent-2)", marginBottom: 4 }}>
            {c.user.name} · {new Date(c.createdAt).toLocaleDateString()}
          </p>
          <p style={{ color: "var(--text)" }}>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
