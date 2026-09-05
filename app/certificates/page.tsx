import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CertificatesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in?next=/certificates");

  const certificates = await prisma.certificate.findMany({
    where: { userId: session.user.id },
    include: { track: true },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">ls ./certificates</span>
          <h1>Your Certificates</h1>
          <p>Earned by completing every lesson in a track on the Max plan.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {certificates.length === 0 ? (
            <div className="card" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
              <h3>No certificates yet</h3>
              <p>
                Complete every lesson in a track while on the Max plan to earn a certificate.
              </p>
              <Link href="/tracks" className="btn btn-primary">
                Browse Tracks
              </Link>
            </div>
          ) : (
            <div className="grid grid-3">
              {certificates.map((cert) => (
                <Link key={cert.id} href={`/certificates/${cert.id}`} className="card-link">
                  <div className="card">
                    <h3 style={{ fontSize: "1rem" }}>{cert.track.title}</h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                      {cert.serial}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
