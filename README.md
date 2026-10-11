# Pramaan

A prototype of a claim-level record for India's GCC ecosystem. Every figure shows who published it, when, and what it counts. Where sources disagree, all of them stay on the page.

Built for a product assignment. The accompanying deck makes the case; this shows the mechanism working.

## What it does

- **Record** (`/record`): cities, state policies and 44 GCCs. Click any figure to see its sources. A blank cell means no source states it.
- **Ingest** (`/ingest`): paste a press release. A model proposes claims, then the server keeps only those whose quoted sentence is in the article and contains the figure. Rejected claims are shown with the reason.
- **Entry brief** (`/brief`): describe a planned centre. The brief is written only from claims on the record. Sentences that cite nothing, or state a number their sources do not, are removed.
- **Method** (`/method`): the rules the record follows.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

Put a key in `.env.local` as `LLM_API_KEY`. Any OpenAI-compatible endpoint works; Groq and Google AI Studio both issue free keys. The record pages work without a key. Ingest and the brief need one.

## Where things are

```
src/data        seed claims, one file per kind of entity, plus the source list
src/lib         record queries, the model client, and the two checks (extract.ts, brief.ts)
src/components  FactRow is the one that matters: a figure that opens to its receipts
src/app         pages and the two API routes
```

The checks are the point of the prototype:

- `src/lib/extract.ts`, `rejectionReason`: a claim is dropped unless its quote is in the article and holds every number in its value.
- `src/lib/brief.ts`, `writeBrief`: a sentence is dropped unless it cites a claim and every number in it appears in what it cites.

## Limits

- The seed data was entered by hand from public pages in October 2026. Most GCC rows rest on a single directory, and headcounts are that directory's tracked professionals, not official figures.
- Several market figures are recorded as cited by a secondary page. Each receipt says so.
- No crawler and no entry-signals feed. The review queue is kept in the browser.
- The number check is a string match. It catches invented figures; it does not catch a sentence that misreads a correct one.
