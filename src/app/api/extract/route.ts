import { extractClaims } from "@/lib/extract";
import { modelErrorResponse } from "@/lib/llm";

const MAX_ARTICLE_LENGTH = 20_000;

export async function POST(request: Request) {
  const { article } = (await request.json()) as { article?: string };

  if (!article || article.trim().length < 80) {
    return Response.json({ error: "too_short" }, { status: 400 });
  }

  try {
    return Response.json(await extractClaims(article.slice(0, MAX_ARTICLE_LENGTH)));
  } catch (error) {
    return modelErrorResponse(error);
  }
}
