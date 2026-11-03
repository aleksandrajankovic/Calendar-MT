"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (newPwd.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      toast.error("New passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/me/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
      });

      if (res.status === 403) {
        toast.error("Current password is incorrect.");
        return;
      }
      if (res.status === 429) {
        toast.error("Too many attempts. Try again in 15 minutes.");
        return;
      }
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }

      toast.success("Password changed.");
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err) {
      console.error(err);
      toast.error(`Failed to change password. ${err.message || ""}`);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)]";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-slate-900">My account</h1>

        <section className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-medium mb-3 text-slate-900">Change password</h2>

          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Current password</span>
              <input
                type="password"
                className={inputClass}
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">New password (min 8 characters)</span>
              <input
                type="password"
                className={inputClass}
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Confirm new password</span>
              <input
                type="password"
                className={inputClass}
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            <div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--green-primary)] text-white text-sm font-semibold px-4 py-2 uppercase tracking-wide hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Change password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
