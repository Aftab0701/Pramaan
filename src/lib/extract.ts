import { extractableFields, type ExtractedClaim, type RejectedClaim } from "./claimFields";
import { completeJson } from "./llm";

const systemPrompt = `You extract facts about Global Capability Centres (GCCs) in India from one article.

Return JSON: {"claims": [{"entity": string, "field": string, "value": string, "quote": string}]}

- "entity" is the company that owns the centre.
- "field" is one of: ${Object.keys(extractableFields).join(", ")}.
- "value" is the fact, as short as possible.
- "quote" is the sentence from the article that states the fact, copied character for character.

Only extract what the article states outright. Do not infer, estimate or use outside knowledge.
If the article states no such facts, return {"claims": []}.`;

const normalise = (text: string) =>
  text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();

const numbersIn = (text: string) => text.match(/\d[\d,.]*/g) ?? [];

/**
 * The model is not trusted. A claim is kept only if its quote appears in the article
 * and every number in its value appears in that quote.
 */
function rejectionReason(claim: ExtractedClaim, article: string): string | null {
  if (!(claim.field in extractableFields)) return "Not a field the record stores";
  if (!claim.quote || !normalise(article).includes(normalise(claim.quote))) {
    return "The quoted sentence is not in the article";
  }
  const quote = normalise(claim.quote);
  const missing = numbersIn(claim.value).find((number) => !quote.includes(number.toLowerCase()));
  if (missing) return `The figure ${missing} is not in the quoted sentence`;
  return null;
}

export async function extractClaims(article: string) {
  const { claims = [] } = await completeJson<{ claims?: ExtractedClaim[] }>([
    { role: "system", content: systemPrompt },
    { role: "user", content: article },
  ]);

  const accepted: ExtractedClaim[] = [];
  const rejected: RejectedClaim[] = [];

  for (const claim of claims) {
    const reason = rejectionReason(claim, article);
    if (reason) rejected.push({ ...claim, reason });
    else accepted.push(claim);
  }

  return { accepted, rejected };
}
