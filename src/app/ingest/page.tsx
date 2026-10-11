"use client";

import { useState } from "react";
import { HighlightedArticle, MissingKeyNotice } from "@/components";
import { usePost, useReviewQueue } from "@/hooks";
import { extractableFields, type ExtractedClaim, type RejectedClaim } from "@/lib/claimFields";
import styles from "./page.module.css";

interface ExtractResult {
  accepted: ExtractedClaim[];
  rejected: RejectedClaim[];
}

const labelOf = (field: string) =>
  extractableFields[field as keyof typeof extractableFields] ?? field;

export default function IngestPage() {
  const [article, setArticle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [url, setUrl] = useState("");
  const [asOf, setAsOf] = useState("");
  const [hovered, setHovered] = useState<string>();
  const [queued, setQueued] = useState<Set<string>>(new Set());

  const { state, run } = usePost<{ article: string }, ExtractResult>("/api/extract");
  const { queue, add, remove } = useReviewQueue();

  const result = state.status === "done" ? state.data : null;
  const canSubmit = article.trim().length >= 80 && state.status !== "loading";

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setQueued(new Set());
    run({ article });
  }

  function sendToReview(claim: ExtractedClaim) {
    add({ ...claim, publisher: publisher || "Unnamed source", url, asOf: asOf || "Undated" });
    setQueued(new Set(queued).add(claim.quote + claim.field));
  }

  return (
    <>
      <header className={styles.intro}>
        <p className="eyebrow rise">Ingest</p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          Paste an article. Get what it states.
        </h1>
        <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
          A model reads the text and proposes claims. The server then checks each one: the quoted
          sentence must be in the article and must contain the figure. Anything that fails is
          rejected and shown.
        </p>
      </header>

      <form className={styles.form} onSubmit={submit}>
        <textarea
          value={article}
          onChange={(event) => setArticle(event.target.value)}
          placeholder="Paste a press release or news article about a GCC opening or expanding in India."
          aria-label="Article text"
          rows={10}
        />
        <div className={styles.sourceFields}>
          <input
            value={publisher}
            onChange={(event) => setPublisher(event.target.value)}
            placeholder="Publisher"
            aria-label="Publisher"
          />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Link"
            aria-label="Link to the article"
            type="url"
          />
          <input
            value={asOf}
            onChange={(event) => setAsOf(event.target.value)}
            placeholder="Published, e.g. Mar 2026"
            aria-label="Publication date"
          />
          <button type="submit" disabled={!canSubmit}>
            {state.status === "loading" ? "Reading…" : "Extract claims"}
          </button>
        </div>
      </form>

      {state.status === "missing_key" && <MissingKeyNotice />}
      {state.status === "error" && <p className={styles.error}>{state.message}</p>}

      {result && (
        <section className={styles.result}>
          <div>
            <h2>The article</h2>
            <HighlightedArticle
              article={article}
              quotes={result.accepted.map((claim) => claim.quote)}
              active={hovered}
            />
          </div>

          <div>
            <h2>
              {result.accepted.length} {result.accepted.length === 1 ? "claim" : "claims"} verified
            </h2>
            {result.accepted.length === 0 && (
              <p className={styles.none}>Nothing in this article could be tied to a sentence.</p>
            )}
            <ul className={styles.claims}>
              {result.accepted.map((claim, index) => {
                const isQueued = queued.has(claim.quote + claim.field);
                return (
                  <li
                    key={index}
                    className="rise"
                    style={{ "--i": index } as React.CSSProperties}
                    onMouseEnter={() => setHovered(claim.quote)}
                    onMouseLeave={() => setHovered(undefined)}
                  >
                    <p className={styles.claimField}>
                      {claim.entity} · {labelOf(claim.field)}
                    </p>
                    <p className={styles.claimValue}>{claim.value}</p>
                    <blockquote>{claim.quote}</blockquote>
                    <button type="button" disabled={isQueued} onClick={() => sendToReview(claim)}>
                      {isQueued ? "In review queue" : "Send to review"}
                    </button>
                  </li>
                );
              })}
            </ul>

            {result.rejected.length > 0 && (
              <>
                <h3 className={styles.rejectedTitle}>{result.rejected.length} rejected</h3>
                <ul className={styles.rejected}>
                  {result.rejected.map((claim, index) => (
                    <li key={index}>
                      <span>
                        {claim.entity} · {labelOf(claim.field)}: {claim.value}
                      </span>
                      <span>{claim.reason}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {queue.length > 0 && (
        <section className={styles.queue}>
          <h2>Review queue</h2>
          <p className={styles.queueNote}>
            Nothing reaches the record without a person approving it. In this prototype the queue is
            kept in your browser.
          </p>
          <ul>
            {queue.map((claim, index) => (
              <li key={index}>
                <span>
                  <strong>{claim.entity}</strong> · {labelOf(claim.field)}: {claim.value}
                </span>
                <span>
                  {claim.publisher}, {claim.asOf}
                </span>
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
