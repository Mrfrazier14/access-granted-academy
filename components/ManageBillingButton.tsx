"use client";

import { useState } from "react";

export default function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Couldn't open billing portal");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <>
      <button className="btn btn-outline" onClick={handleClick} disabled={loading}>
        {loading ? "Opening…" : "Manage Billing"}
      </button>
      {error && <span style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{error}</span>}
    </>
  );
}
