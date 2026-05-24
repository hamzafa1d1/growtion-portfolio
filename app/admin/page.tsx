"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Identifiants incorrects. Réessayez.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0D0B2B 0%, #1a0a3d 100%)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />

      <div
        className="relative w-full max-w-md rounded-3xl p-8 flex flex-col gap-6"
        style={{
          background: "rgba(20,17,50,0.95)",
          border: "1px solid rgba(124,58,237,0.3)",
          boxShadow: "0 20px 60px rgba(124,58,237,0.2)",
        }}
      >
        {/* Logo + title */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <Image src="/logo.svg" alt="Growtion" width={56} height={56} />
          <div className="text-center">
            <h1 className="text-2xl font-black text-white tracking-widest">GROWTION</h1>
            <p className="text-purple-400 text-sm font-semibold mt-1">Admin · Gestion des assets</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="growtion"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.3)")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.3)")}
            />
          </div>

          {error && (
            <p
              className="text-sm text-center py-2 px-4 rounded-xl"
              style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-black text-white text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            style={{
              background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7C3AED, #9333EA)",
              boxShadow: loading ? "none" : "0 0 24px rgba(124,58,237,0.4)",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs">
          Accès réservé au propriétaire de Growtion
        </p>
      </div>
    </div>
  );
}
