import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/tier";

export default async function CodingProblemsPage() {
  const session = await auth();
  let userTier: "FREE" | "PRO" | "MAX" = "FREE";
  let solvedIds = new Set<string>();

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) userTier = user.tier;

    const submissions = await prisma.codingSubmission.findMany({
      where: { userId: session.user.id, passed: true },
      select: { problemId: true },
    });
    solvedIds = new Set(submissions.map((s) => s.problemId));
  }

  const problems = await prisma.codingProblem.findMany({ orderBy: { order: "asc" } });

  const byDifficulty = {
    EASY: problems.filter((p) => p.difficulty === "EASY"),
    MEDIUM: problems.filter((p) => p.difficulty === "MEDIUM"),
    HARD: problems.filter((p) => p.difficulty === "HARD"),
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">ls ./coding-problems</span>
          <h1>Coding Problems</h1>
          <p>Practice from small warm-ups to interview-level challenges, graded instantly in your browser.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {(["EASY", "MEDIUM", "HARD"] as const).map((difficulty) => (
            <div key={difficulty} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.2rem" }}>{difficulty[0] + difficulty.slice(1).toLowerCase()}</h2>
              <div className="grid grid-3">
                {byDifficulty[difficulty].map((problem) => {
                  const locked = !hasAccess(userTier, problem.minTier);
                  return (
                    <Link key={problem.id} href={`/coding/${problem.id}`} className="card-link">
                      <div className="card">
                        <h3 style={{ fontSize: "1rem" }}>{problem.title}</h3>
                        <div className="tag-row">
                          {solvedIds.has(problem.id) && <span className="tag done">✓ Solved</span>}
                          {locked && <span className="tag">🔒 {problem.minTier}</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
