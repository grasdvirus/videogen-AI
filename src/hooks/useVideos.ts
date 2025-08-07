"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { VideoMeta } from "@/types/video";

export function useMyVideos() {
  const user = auth.currentUser;
  const q = user
    ? query(
        collection(db, "videos"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      )
    : null;
  const [snapshot, loading, error] = useCollection(q);
  const videos: VideoMeta[] =
    snapshot?.docs.map((d) => {
      const data = d.data() as Omit<VideoMeta, "id">;
      return { id: d.id, ...data };
    }) || [];
  return { videos, loading, error };
}
