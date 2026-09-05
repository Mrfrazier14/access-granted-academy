import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/tier";
import CodingEditor from "@/components/CodingEditor";

export default async function CodingProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  const session = await auth();

  const problem = await prisma.codingProblem.findUnique({ where: { id: problemId } });
  if (!problem) notFound();

  let userTier: "FREE" | "PRO" | "MAX" = "FREE";
  let previousCode: string | null = null;

  if (session?.user?.id) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
    userTier = user.tier;

    const submission = await prisma.codingSubmission.findUnique({
      where: { userId_problemId: { userId: user.id, problemId } },
    });
    previousCode = submission?.code ?? null;
  }

  const locked = !hasAccess(userTier, problem.minTier);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800, margin: "0 auto" }}>
        <span className="prompt">
          <Link href="/coding">coding-problems</Link> / {problem.title}
        </span>
        <h1>{problem.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: `<p>${problem.prompt}</p>` }} />

        {locked ? (
          <div className="card" style={{ textAlign: "center" }}>
            <h3>This problem requires the {problem.minTier} plan</h3>
            <p>Upgrade to unlock coding problems and track your submissions.</p>
            <Link href="/pricing" className="btn btn-primary">
              View Plans
            </Link>
          </div>
        ) : (
          <CodingEditor
            problemId={problem.id}
            starterCode={previousCode ?? problem.starterCode}
            testCode={problem.testCode}
            signedIn={!!session?.user}
          />
        )}
      </div>
    </section>
  );
}
