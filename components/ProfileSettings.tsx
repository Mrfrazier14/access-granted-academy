"use client";

import { useState } from "react";

export default function ProfileSettings({
  userId,
  initialBio,
  initialIsPublic,
}: {
  userId: string;
  initialBio: string;
  initialIsPublic: boolean;
}) {
  const [bio, setBio] = useState(initialBio);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, isPublic }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  return (
    <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3>Public Profile</h3>
      <div className="field">
        <label htmlFor="bio">Bio</label>
        <input
          id="bio"
          type="text"
          maxLength={300}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A short line about you"
        />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "0.9rem" }}>
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        Make my profile and certificates publicly visible
      </label>
      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </button>
      {saved && <span style={{ marginLeft: 12, color: "var(--accent)", fontSize: "0.85rem" }}>Saved ✓</span>}
      <p className="form-note" style={{ marginTop: 12 }}>
        <a href={`/u/${userId}`}>View your public profile →</a>
      </p>
    </div>
  );
}
