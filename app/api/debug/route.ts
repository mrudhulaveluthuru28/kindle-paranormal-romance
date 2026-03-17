import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function GET() {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return Response.json({ ok: false, error: "GROQ_API_KEY is not set" });
  }

  try {
    const groq = createGroq({ apiKey: key });
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: "Say hello in one word.",
      maxTokens: 10,
    });
    return Response.json({ ok: true, response: text, keyPrefix: key.slice(0, 8) + "..." });
  } catch (err) {
    return Response.json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      keyPrefix: key.slice(0, 8) + "...",
    });
  }
}
