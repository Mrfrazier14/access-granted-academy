import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { tierLabel } from "@/lib/tier";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await auth();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) notFound();

  const isOwner = session?.user?.id === user.id;
  if (!user.isPublic && !isOwner) notFound();

  const [certificates, completedCount, solvedCount] = await Promise.all([
    prisma.certificate.findMany({ where: { userId: user.id }, include: { track: true } }),
    prisma.lessonProgress.count({ where: { userId: user.id } }),
    prisma.codingSubmission.count({ where: { userId: user.id, passed: true } }),
  ]);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="card" style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="prompt">whoami</span>
          <h1>{user.name}</h1>
          {user.bio && <p>{user.bio}</p>}
          <div className="tag-row" style={{ justifyContent: "center" }}>
            <span className="tag done">{tierLabel(user.tier)} member</span>
            <span className="tag">{completedCount} lessons completed</span>
            <span className="tag">{solvedCount} coding problems solved</span>
            <span className="tag">{certificates.length} certificates</span>
          </div>
          <p style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
            Member since {user.createdAt.toDateString()}
          </p>
        </div>

        {certificates.length > 0 && (
          <>
            <h2 style={{ textAlign: "center" }}>Certificates</h2>
            <div className="grid grid-3">
              {certificates.map((cert) => (
                <Link key={cert.id} href={`/certificates/${cert.id}`} className="card-link">
                  <div className="card">
                    <h3 style={{ fontSize: "1rem" }}>{cert.track.title}</h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>{cert.serial}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
