import { completeJson } from "./llm";
import {
  claimsOf,
  getEntityById,
  listEntities,
  sourceOf,
  toCitation,
  valueOf,
  type Citation,
} from "./record";
import type { Claim, Entity } from "./types";

export interface BriefRequest {
  company: string;
  sector: string;
  work: string;
  headcount: number;
  months: number;
}

export interface BriefSentence {
  text: string;
  claimIds: string[];
}

export interface Brief {
  sections: { heading: string; sentences: BriefSentence[] }[];
  gaps: string[];
  citations: Record<string, Citation>;
  /** Sentences the model wrote that we removed, with the reason. */
  dropped: { text: string; reason: string }[];
  claimsConsidered: number;
}

interface ModelBrief {
  sections?: { heading: string; sentences: { text: string; cites: string[] }[] }[];
  gaps?: string[];
}

const PEER_LIMIT = 8;

/** "42k+" and "7,000+" both become comparable numbers; anything unreadable sorts last. */
function headcountOf(entity: Entity): number {
  const raw = valueOf(entity.id, "headcount_india");
  if (!raw) return Number.POSITIVE_INFINITY;
  const number = parseFloat(raw.replace(/,/g, ""));
  return raw.toLowerCase().includes("k") ? number * 1000 : number;
}

/** Same sector first, then the centres closest in size to what the entrant is planning. */
function pickPeers(request: BriefRequest): Entity[] {
  const gccs = listEntities("gcc");
  const sameSector = gccs.filter((gcc) => valueOf(gcc.id, "sector") === request.sector);
  const pool = sameSector.length >= 3 ? sameSector : gccs;

  return [...pool]
    .sort(
      (a, b) =>
        Math.abs(headcountOf(a) - request.headcount) - Math.abs(headcountOf(b) - request.headcount),
    )
    .slice(0, PEER_LIMIT);
}

function evidenceFor(request: BriefRequest): Claim[] {
  const context = [...listEntities("market"), ...listEntities("city"), ...listEntities("policy")];
  return [...pickPeers(request), ...context].flatMap((entity) => claimsOf(entity.id));
}

function describe(claim: Claim, key: string): string {
  const entity = getEntityById(claim.entityId)!;
  const counts = claim.counts ? `; counts: ${claim.counts}` : "";
  return `[${key}] ${entity.name} (${entity.kind}) · ${claim.field}: ${claim.value} (${sourceOf(claim).publisher}, ${claim.asOf}${counts})`;
}

const systemPrompt = `You write a one-page entry brief for a company planning a Global Capability Centre in India.

You may only use the numbered claims the user gives you. You have no other knowledge of India, GCCs or these companies.

Return JSON:
{"sections": [{"heading": string, "sentences": [{"text": string, "cites": [string]}]}], "gaps": [string]}

- Write three sections: "Companies like yours", "Cities", "Incentives".
- At most four sentences per section. This is one page, so choose: prefer the peers closest to the planned headcount, the cities where those peers are, and the incentives this company could qualify for.
- Use market-wide claims only where they bear on this company's decision.
- Every sentence must cite at least one claim key, such as "c12", and say nothing the cited claims do not say.
- Copy figures exactly as they appear in the claim.
- Where claims disagree, say that they disagree and give both figures.
- Do not recommend a city or a provider. Lay out what the record shows.
- In "gaps", list what this company would need to know that the claims do not cover.
- Plain sentences. No headings inside sentences, no bullet characters.`;

const numbersIn = (text: string) => text.match(/\d[\d,.]*\d|\d/g) ?? [];

export async function writeBrief(request: BriefRequest): Promise<Brief> {
  const evidence = evidenceFor(request);
  const keyed = new Map(evidence.map((claim, i) => [`c${i + 1}`, claim]));

  const userPrompt = [
    `Company: ${request.company}`,
    `Sector: ${request.sector}`,
    `Work planned for the centre: ${request.work}`,
    `Planned headcount: ${request.headcount}`,
    `Months until it must be running: ${request.months}`,
    "",
    "Claims:",
    ...[...keyed].map(([key, claim]) => describe(claim, key)),
  ].join("\n");

  const draft = await completeJson<ModelBrief>([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  // Figures the entrant typed in are theirs to repeat; everything else must come from a cited claim.
  const allowedFromRequest = new Set([String(request.headcount), String(request.months)]);
  const dropped: Brief["dropped"] = [];

  const sections = (draft.sections ?? []).map((section) => ({
    heading: section.heading,
    sentences: section.sentences.flatMap((sentence): BriefSentence[] => {
      const cited = (sentence.cites ?? []).flatMap((key) => keyed.get(key) ?? []);
      if (cited.length === 0) {
        dropped.push({ text: sentence.text, reason: "No claim cited" });
        return [];
      }

      // Publisher names count as support too: "Talent500" would otherwise read as an unsourced 500.
      const support = cited
        .map((claim) =>
          [claim.value, claim.counts, claim.asOf, sourceOf(claim).publisher]
            .filter(Boolean)
            .join(" "),
        )
        .join(" ");
      const unsupported = numbersIn(sentence.text).find(
        (number) => !support.includes(number) && !allowedFromRequest.has(number),
      );
      if (unsupported) {
        dropped.push({ text: sentence.text, reason: `${unsupported} is not in the cited claims` });
        return [];
      }

      return [{ text: sentence.text, claimIds: cited.map((claim) => claim.id) }];
    }),
  }));

  const citations = Object.fromEntries(
    sections
      .flatMap((section) => section.sentences.flatMap((sentence) => sentence.claimIds))
      .map((id) => [id, toCitation(evidence.find((claim) => claim.id === id)!)]),
  );

  return {
    sections: sections.filter((section) => section.sentences.length > 0),
    gaps: draft.gaps ?? [],
    citations,
    dropped,
    claimsConsidered: evidence.length,
  };
}
