import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { lessonId } = await params;
  const body = (await request.json()) as { body: string };
  const text = (body.body ?? "").trim();

  if (!text || text.length > 2000) {
    return NextResponse.json({ error: "Comment must be 1-2000 characters" }, { status: 400 });
  }

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: { lessonId, userId: session.user.id, body: text },
    include: { user: { select: { name: true } } },
  });

  return NextResponse.json({ comment });
}
