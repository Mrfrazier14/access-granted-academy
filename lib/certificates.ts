import { prisma } from "@/lib/prisma";

function generateSerial(trackSlug: string) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AGA-${trackSlug.toUpperCase().slice(0, 6)}-${random}`;
}

export async function maybeIssueCertificate(userId: string, lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { track: { include: { modules: { include: { lessons: true } } } } } } },
  });
  if (!lesson) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.tier !== "MAX") return null;

  const track = lesson.module.track;
  const allLessonIds = track.modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (allLessonIds.length === 0) return null;

  const completed = await prisma.lessonProgress.findMany({
    where: { userId, lessonId: { in: allLessonIds } },
    select: { lessonId: true },
  });

  if (completed.length < allLessonIds.length) return null;

  const existing = await prisma.certificate.findUnique({
    where: { userId_trackId: { userId, trackId: track.id } },
  });
  if (existing) return existing;

  return prisma.certificate.create({
    data: { userId, trackId: track.id, serial: generateSerial(track.slug) },
  });
}
