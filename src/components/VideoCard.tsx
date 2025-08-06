"use client";
import { VideoMeta } from "@/types/video";
import Image from "next/image";
import Link from "next/link";

export default function VideoCard({ video }: { video: VideoMeta }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-purple-400/20 transition-shadow">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        {/* Placeholder thumbnail */}
        <Image
          src={video.thumbnailUrl || "/favico.png"}
          alt={video.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
      <p className="text-sm opacity-80 line-clamp-3">{video.description}</p>
      <div className="flex justify-between items-center text-xs opacity-70">
        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <Link
            href={video.downloadUrl || "#"}
            className="hover:text-purple-300 transition-colors"
          >
            Télécharger
          </Link>
          <button className="hover:text-purple-300" disabled>
            Publier TikTok
          </button>
        </div>
      </div>
    </div>
  );
}
