import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function TrackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const track = await prisma.track.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: { quiz: true },
          },
        },
      },
    },
  });

  if (!track) notFound();

  const completedLessonIds = new Set<string>();
  if (session?.user?.id) {
    const progress = await prisma.lessonProgress.findMany({
      where: { userId: session.user.id },
      select: { lessonId: true },
    });
    progress.forEach((p) => completedLessonIds.add(p.lessonId));
  }

  const totalLessons = track.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = track.modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => completedLessonIds.has(l.id)).length,
    0
  );
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">cat {track.slug}.md</span>
          <h1>{track.title}</h1>
          <p>{track.description}</p>
          {session?.user?.id && (
            <div style={{ maxWidth: 320, marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                <span>Your progress</span>
                <span>
                  {completedCount}/{totalLessons} lessons
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {track.modules.map((module) => (
            <div key={module.id} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.2rem" }}>{module.title}</h2>
              <p>{module.summary}</p>
              <div className="grid grid-3">
                {module.lessons.map((lesson) => {
                  const done = completedLessonIds.has(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="card-link"
                    >
                      <div className="card">
                        <h3 style={{ fontSize: "1rem" }}>{lesson.title}</h3>
                        <div className="tag-row">
                          {done && <span className="tag done">✓ Completed</span>}
                          {lesson.quiz && <span className="tag">Quiz included</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
