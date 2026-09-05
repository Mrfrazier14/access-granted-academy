import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/tier";
import InterviewPractice from "@/components/InterviewPractice";

export default async function InterviewPrepPage() {
  const session = await auth();
  let userTier: "FREE" | "PRO" | "MAX" = "FREE";

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) userTier = user.tier;
  }

  const questions = await prisma.interviewQuestion.findMany({ orderBy: { order: "asc" } });
  const locked = questions.length > 0 && !hasAccess(userTier, questions[0].minTier);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">./mock-interview --start</span>
          <h1>Mock Interview Practice</h1>
          <p>Timed behavioral and technical questions with sample answers and tips, so you can practice out loud before the real thing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {locked ? (
            <div className="card" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
              <h3>Mock Interview Practice is a Max plan feature</h3>
              <p>Upgrade to Max to unlock timed practice with sample answers and tips.</p>
              <Link href="/pricing" className="btn btn-primary">
                View Plans
              </Link>
            </div>
          ) : (
            <InterviewPractice
              questions={questions.map((q) => ({
                id: q.id,
                category: q.category,
                prompt: q.prompt,
                sampleAnswer: q.sampleAnswer,
                tips: q.tips,
              }))}
            />
          )}
        </div>
      </section>
    </>
  );
}
