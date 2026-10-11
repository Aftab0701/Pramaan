export class MissingKeyError extends Error {
  constructor() {
    super("No model key configured");
  }
}

export class BusyError extends Error {
  constructor() {
    super("The model is busy. Try again in a moment.");
  }
}

const BUSY = new Set([429, 503]);
const MAX_RETRIES = 3;

interface Message {
  role: "system" | "user";
  content: string;
}

/** Calls any OpenAI-compatible chat endpoint and parses the reply as JSON. */
export async function completeJson<T>(messages: Message[]): Promise<T> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) throw new MissingKeyError();

  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.groq.com/openai/v1";
  const model = process.env.LLM_MODEL ?? "llama-3.3-70b-versatile";

  const request = () =>
    fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0,
        response_format: { type: "json_object" },
      }),
    });

  // Free tiers shed load with 429 and 503. A short wait usually clears it.
  let response = await request();
  for (let attempt = 1; attempt <= MAX_RETRIES && BUSY.has(response.status); attempt++) {
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    response = await request();
  }

  if (BUSY.has(response.status)) throw new BusyError();
  if (!response.ok) {
    throw new Error(`Model request failed (${response.status}): ${await response.text()}`);
  }

  const body = await response.json();
  return JSON.parse(body.choices[0].message.content) as T;
}

export function modelErrorResponse(error: unknown): Response {
  if (error instanceof MissingKeyError) {
    return Response.json({ error: "missing_key" }, { status: 503 });
  }
  const message = error instanceof Error ? error.message : "Unknown error";
  return Response.json({ error: "model_failed", message }, { status: 502 });
}
