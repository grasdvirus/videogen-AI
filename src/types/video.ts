export interface VideoMeta {
  id: string;
  userId: string;
  title: string;
  description: string;
  sourceType: "youtube" | "script";
  sourceValue: string; // link or original text
  createdAt: number;
  thumbnailUrl?: string;
  downloadUrl?: string;
}
