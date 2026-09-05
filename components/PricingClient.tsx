"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Billing = "monthly" | "yearly";

export default function PricingClient({
  signedIn,
  stripeEnabled,
  currentTier,
}: {
  signedIn: boolean;
  stripeEnabled: boolean;
  currentTier: "FREE" | "PRO" | "MAX";
}) {
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState(10);
  const [error, setError] = useState<string | null>(null);

  const prices = {
    pro: billing === "monthly" ? 10 : 96, // ~20% off yearly
    max: billing === "monthly" ? 20 : 192,
  };

  async function startCheckout(plan: string) {
    setError(null);

    if (!signedIn) {
      router.push(`/sign-in?next=/pricing`);
      return;
    }

    setLoadingPlan(plan);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong starting checkout.");
      setLoadingPlan(null);
      return;
    }

    window.location.href = data.url;
  }

  async function startDonation() {
    setError(null);
    setLoadingPlan("donate");

    const res = await fetch("/api/stripe/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: donationAmount }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong starting your donation.");
      setLoadingPlan(null);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div>
      {!stripeEnabled && (
        <div className="form-error" style={{ maxWidth: 640, margin: "0 auto 30px" }}>
          Payments aren&apos;t live yet — the site owner hasn&apos;t connected a Stripe account.
          Free content is fully available in the meantime.
        </div>
      )}
      {error && (
        <div className="form-error" style={{ maxWidth: 640, margin: "0 auto 20px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40 }}>
        <button
          className={billing === "monthly" ? "btn btn-primary" : "btn btn-outline"}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={billing === "yearly" ? "btn btn-primary" : "btn btn-outline"}
          onClick={() => setBilling("yearly")}
        >
          Yearly (save ~20%)
        </button>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <h3>Free</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", color: "var(--text)" }}>
            $0
          </p>
          <div className="tag-row">
            <span className="tag">All lessons &amp; quizzes</span>
            <span className="tag">Progress tracking</span>
            <span className="tag">Community comments</span>
          </div>
          <div style={{ marginTop: 20 }}>
            {currentTier === "FREE" ? (
              <span className="tag done">Current plan</span>
            ) : (
              <span className="tag">Included in your plan</span>
            )}
          </div>
        </div>

        <div className="card" style={{ borderColor: "var(--accent-2)" }}>
          <h3>Pro</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", color: "var(--text)" }}>
            ${prices.pro}
            <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              /{billing === "monthly" ? "mo" : "yr"}
            </span>
          </p>
          <div className="tag-row">
            <span className="tag">Everything in Free</span>
            <span className="tag">Coding problems (Easy–Hard)</span>
            <span className="tag">CompTIA-style practice exams</span>
          </div>
          <div style={{ marginTop: 20 }}>
            {currentTier === "PRO" || currentTier === "MAX" ? (
              <span className="tag done">Current plan or higher</span>
            ) : (
              <button
                className="btn btn-primary"
                disabled={loadingPlan !== null}
                onClick={() => startCheckout(billing === "monthly" ? "pro-monthly" : "pro-yearly")}
              >
                {loadingPlan?.startsWith("pro") ? "Redirecting…" : "Upgrade to Pro"}
              </button>
            )}
          </div>
        </div>

        <div className="card" style={{ borderColor: "var(--accent)" }}>
          <h3>Max</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", color: "var(--text)" }}>
            ${prices.max}
            <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              /{billing === "monthly" ? "mo" : "yr"}
            </span>
          </p>
          <div className="tag-row">
            <span className="tag">Everything in Pro</span>
            <span className="tag">Mock interview practice</span>
            <span className="tag">Certificates of completion</span>
            <span className="tag">Early access to new labs</span>
          </div>
          <div style={{ marginTop: 20 }}>
            {currentTier === "MAX" ? (
              <span className="tag done">Current plan</span>
            ) : (
              <button
                className="btn btn-primary"
                disabled={loadingPlan !== null}
                onClick={() => startCheckout(billing === "monthly" ? "max-monthly" : "max-yearly")}
              >
                {loadingPlan?.startsWith("max") ? "Redirecting…" : "Upgrade to Max"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 480, margin: "48px auto 0", textAlign: "center" }}>
        <h3>Support the Academy</h3>
        <p>Prefer a one-time contribution instead of a subscription? Any amount helps keep the free content growing.</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
          {[5, 10, 25, 50].map((amt) => (
            <button
              key={amt}
              className={donationAmount === amt ? "btn btn-primary" : "btn btn-outline"}
              onClick={() => setDonationAmount(amt)}
            >
              ${amt}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={startDonation} disabled={loadingPlan !== null}>
          {loadingPlan === "donate" ? "Redirecting…" : `Donate $${donationAmount}`}
        </button>
      </div>
    </div>
  );
}
