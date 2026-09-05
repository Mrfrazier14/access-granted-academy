import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  const session = await auth();

  const certificate = await prisma.certificate.findUnique({
    where: { id: certificateId },
    include: { track: true, user: true },
  });

  if (!certificate) notFound();

  const isOwner = session?.user?.id === certificate.userId;
  if (!certificate.user.isPublic && !isOwner) notFound();

  return (
    <section className="section">
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card"
          style={{
            maxWidth: 640,
            width: "100%",
            textAlign: "center",
            padding: "50px 40px",
            border: "2px solid var(--accent)",
          }}
        >
          <p className="prompt">certificate --verify</p>
          <h1 style={{ fontSize: "1.6rem" }}>Certificate of Completion</h1>
          <p style={{ color: "var(--muted)", marginTop: 20 }}>This certifies that</p>
          <h2 style={{ color: "var(--accent)", fontSize: "1.8rem", margin: "8px 0 20px" }}>
            {certificate.user.name}
          </h2>
          <p style={{ color: "var(--muted)" }}>has successfully completed</p>
          <h3 style={{ margin: "8px 0 24px" }}>{certificate.track.title}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)" }}>
            Issued {certificate.issuedAt.toDateString()}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-2)" }}>
            Serial: {certificate.serial}
          </p>
          <p style={{ marginTop: 24, fontSize: "0.8rem" }}>
            Access Granted Academy — access-granted.academy
          </p>
        </div>
      </div>
    </section>
  );
}
