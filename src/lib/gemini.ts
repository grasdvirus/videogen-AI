export async function generateScript(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI API key missing");

  // Simple call to Gemini 2.5 Flash text endpoint (pseudo)
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Gemini error");
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}
