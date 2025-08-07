"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { generateScript } from "@/lib/gemini";
import { VideoMeta } from "@/types/video";

export default function CreatePage() {
  const [mode, setMode] = useState<"youtube" | "script">("youtube");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  async function handleSubmit() {
    if (!auth.currentUser) return router.push("/login");
    if (!input) return alert("Veuillez remplir le champ.");

    setLoading(true);
    let scriptText = input;
    try {
      if (mode === "youtube") {
        // For demo, we craft a Gemini prompt using video link
        scriptText = await generateScript(
          `Generate a short, engaging video script (<= 60s) in French based on the YouTube video at ${input}. Respond with only the script.`
        );
      }
      // Simulate rendering with progress 0 -> 100 over 30s
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
          }
          return p + 4;
        });
      }, 1200);

      // Wait fake 30s
      await new Promise((res) => setTimeout(res, 30000));

      const videoDoc: Omit<VideoMeta, "id"> = {
        userId: auth.currentUser.uid,
        title: scriptText.split("\n")[0].slice(0, 80) || "Vidéo générée",
        description: scriptText,
        sourceType: mode,
        sourceValue: input,
        createdAt: Date.now(),
      };
      await addDoc(collection(db, "videos"), videoDoc);

      setProgress(100);
      alert("Vidéo générée !");
      router.push("/profile");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erreur inconnue";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white gap-6">
      <h1 className="text-3xl font-bold">Créer une vidéo</h1>
      <div className="flex gap-4">
        <button
          className={`${mode === "youtube" ? "bg-purple-600" : "bg-white/20"} rounded-full px-4 py-2 transition`}
          onClick={() => setMode("youtube")}
          disabled={loading}
        >
          Lien YouTube
        </button>
        <button
          className={`${mode === "script" ? "bg-purple-600" : "bg-white/20"} rounded-full px-4 py-2 transition`}
          onClick={() => setMode("script")}
          disabled={loading}
        >
          Script écrit
        </button>
      </div>
      <textarea
        disabled={loading}
        rows={6}
        placeholder={mode === "youtube" ? "https://youtu.be/..." : "Écrivez votre histoire..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-xl p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Génération en cours..." : "Générer"}
      </button>
      {loading && (
        <div className="w-full max-w-xl h-4 bg-white/20 rounded-lg overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
