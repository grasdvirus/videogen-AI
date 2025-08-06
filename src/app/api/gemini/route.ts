import { NextResponse } from "next/server";
import { generateScript } from "@/lib/gemini";

export const dynamic = "force-dynamic"; // avoid caching

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) return NextResponse.json({ error: "Prompt missing" }, { status: 400 });

    const text = await generateScript(prompt);
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
