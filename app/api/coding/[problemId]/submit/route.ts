import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/tier";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { problemId } = await params;
  const body = (await request.json()) as { code: string; passed: boolean };

  const [user, problem] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.user.id } }),
    prisma.codingProblem.findUnique({ where: { id: problemId } }),
  ]);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  if (!hasAccess(user.tier, problem.minTier)) {
    return NextResponse.json({ error: "Upgrade your plan to submit this problem" }, { status: 403 });
  }

  await prisma.codingSubmission.upsert({
    where: { userId_problemId: { userId: user.id, problemId } },
    update: { code: body.code, passed: body.passed, submittedAt: new Date() },
    create: { userId: user.id, problemId, code: body.code, passed: body.passed },
  });

  return NextResponse.json({ ok: true });
}
