import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripeEnabled } from "@/lib/stripe";
import PricingClient from "@/components/PricingClient";

export default async function PricingPage() {
  const session = await auth();
  let currentTier: "FREE" | "PRO" | "MAX" = "FREE";

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) currentTier = user.tier;
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">cat pricing.md</span>
          <h1>Plans &amp; Pricing</h1>
          <p>
            Core lessons are free, forever. Upgrade for coding labs, cert practice, mock
            interviews, and certificates.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PricingClient
            signedIn={!!session?.user}
            stripeEnabled={stripeEnabled}
            currentTier={currentTier}
          />
        </div>
      </section>
    </>
  );
}
