import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in?next=/dashboard");
  }

  const userId = session.user.id;

  const [tracks, completedLessons, quizAttempts] = await Promise.all([
    prisma.track.findMany({
      orderBy: { order: "asc" },
      include: { modules: { include: { lessons: true } } },
    }),
    prisma.lessonProgress.findMany({
      where: { userId },
      select: { lessonId: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { quiz: { include: { lesson: true } } },
      take: 10,
    }),
  ]);

  const completedIds = new Set(completedLessons.map((p) => p.lessonId));
  const totalLessons = tracks.reduce(
    (sum, t) => sum + t.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">cat dashboard.log</span>
          <h1>Welcome back, {session.user.name}</h1>
          <p>
            You've completed {completedIds.size} of {totalLessons} lessons across all
            tracks.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">progress --by-track</span>
            <h2>Your Progress</h2>
          </div>

          <div className="grid grid-2">
            {tracks.map((track) => {
              const trackTotal = track.modules.reduce((s, m) => s + m.lessons.length, 0);
              const trackDone = track.modules.reduce(
                (s, m) => s + m.lessons.filter((l) => completedIds.has(l.id)).length,
                0
              );
              const pct = trackTotal > 0 ? Math.round((trackDone / trackTotal) * 100) : 0;

              return (
                <div className="card" key={track.id}>
                  <h3>{track.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    <span>{pct}% complete</span>
                    <span>
                      {trackDone}/{trackTotal}
                    </span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="tag-row">
                    <Link href={`/tracks/${track.slug}`} className="tag">
                      {trackDone > 0 ? "Continue" : "Start"} track →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">cat quiz-history.log</span>
            <h2>Recent Quiz Attempts</h2>
          </div>

          {quizAttempts.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              You haven&apos;t taken any quizzes yet. Complete a lesson and test yourself!
            </p>
          ) : (
            <div className="grid grid-3">
              {quizAttempts.map((attempt) => (
                <div className="card" key={attempt.id}>
                  <h3 style={{ fontSize: "1rem" }}>{attempt.quiz.title}</h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    Score: {attempt.score}/{attempt.totalPoints}
                  </p>
                  <Link href={`/lessons/${attempt.quiz.lesson.id}`} className="tag">
                    Review lesson →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
