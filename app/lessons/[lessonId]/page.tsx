import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CompleteLessonButton from "@/components/CompleteLessonButton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const session = await auth();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      quiz: true,
      module: {
        include: {
          track: true,
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!lesson) notFound();

  const siblingLessons = lesson.module.lessons;
  const currentIndex = siblingLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = siblingLessons[currentIndex + 1];

  let initiallyComplete = false;
  if (session?.user?.id) {
    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: session.user.id, lessonId: lesson.id } },
    });
    initiallyComplete = !!existing;
  }

  return (
    <section className="section">
      <div className="container lesson-content">
        <span className="prompt">
          <Link href={`/tracks/${lesson.module.track.slug}`}>
            {lesson.module.track.title}
          </Link>{" "}
          / {lesson.module.title}
        </span>
        <h1>{lesson.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
          }}
        >
          <CompleteLessonButton
            lessonId={lesson.id}
            initiallyComplete={initiallyComplete}
            signedIn={!!session?.user}
          />

          {lesson.quiz && (
            <Link href={`/quizzes/${lesson.quiz.id}`} className="btn btn-outline">
              Take the Quiz
            </Link>
          )}

          {nextLesson && (
            <Link href={`/lessons/${nextLesson.id}`} className="btn btn-outline">
              Next Lesson →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
