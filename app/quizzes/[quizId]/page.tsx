import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import QuizForm from "@/components/QuizForm";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const session = await auth();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
      lesson: true,
    },
  });

  if (!quiz) notFound();

  if (!session?.user) {
    redirect(`/sign-in?next=/quizzes/${quizId}`);
  }

  const questionsForClient = quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    choices: q.choices.map((c) => ({ id: c.id, text: c.text })),
  }));

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="section-intro">
          <span className="prompt">./quiz --run</span>
          <h1>{quiz.title}</h1>
          <p>Based on: {quiz.lesson.title}</p>
        </div>

        <QuizForm quizId={quiz.id} questions={questionsForClient} lessonId={quiz.lessonId} />
      </div>
    </section>
  );
}
