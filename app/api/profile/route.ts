import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await request.json()) as { bio?: string; isPublic?: boolean };

  if (body.bio !== undefined && body.bio.length > 300) {
    return NextResponse.json({ error: "Bio must be 300 characters or fewer" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(body.bio !== undefined ? { bio: body.bio } : {}),
      ...(body.isPublic !== undefined ? { isPublic: body.isPublic } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
