"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push("/profile");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md space-y-4 animate-fade-in"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Se connecter</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 active:scale-95 transition-transform shadow-md"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        <p className="text-center text-sm">
          Pas encore de compte ? {" "}
          <Link href="/signup" className="underline hover:text-purple-300">
            Inscription
          </Link>
        </p>
      </form>
    </div>
  );
}
