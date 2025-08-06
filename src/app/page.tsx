// Landing page – VideoGen AI
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white relative">
      <div className="backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl rounded-3xl p-10 flex flex-col items-center gap-8 w-[90%] max-w-xl animate-fade-in">
        <Image
          src="/favico.png"
          alt="VideoGen AI Logo"
          width={120}
          height={120}
          className="drop-shadow-lg"
        />
        <h1 className="text-4xl font-bold text-center leading-tight">
          VideoGen <span className="text-purple-400">AI</span>
        </h1>
        <p className="text-center opacity-80 max-w-md">
          Génère des vidéos stylisées à partir d’un lien YouTube ou d’une
          histoire que tu écris. Laisse l’IA transformer tes idées en contenu
          captivant !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/create"
            className="rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform text-center w-full sm:w-auto shadow-lg"
          >
            Créer une vidéo
          </Link>
          <Link
            href="/profile"
            className="rounded-full px-6 py-3 bg-white/20 hover:bg-white/30 active:scale-95 transition-transform text-center w-full sm:w-auto"
          >
            Mon profil
          </Link>
        </div>
      </div>

      {/* subtil voile animé */}
      <div className="absolute inset-0 pointer-events-none animate-gradient-x bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </main>
  );
}