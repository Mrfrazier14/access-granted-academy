import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { maybeIssueCertificate } from "@/lib/certificates";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { quizId } = await params;
  const body = (await request.json()) as { answers: Record<string, string> };
  const answers = body.answers ?? {};

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { include: { choices: true } } },
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  let score = 0;
  const totalPoints = quiz.questions.length;
  const results: Record<string, boolean> = {};

  for (const question of quiz.questions) {
    const selectedChoiceId = answers[question.id];
    const correctChoice = question.choices.find((c) => c.isCorrect);
    const isCorrect = !!selectedChoiceId && selectedChoiceId === correctChoice?.id;
    results[question.id] = isCorrect;
    if (isCorrect) score += 1;
  }

  await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId,
      score,
      totalPoints,
    },
  });

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId: session.user.id, lessonId: quiz.lessonId },
    },
    update: {},
    create: { userId: session.user.id, lessonId: quiz.lessonId },
  });

  const certificate = await maybeIssueCertificate(session.user.id, quiz.lessonId);

  return NextResponse.json({ score, totalPoints, results, certificateIssued: !!certificate });
}
