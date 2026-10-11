"use client";

import Link from "next/link";
import { useState } from "react";
import { MissingKeyNotice } from "@/components";
import { sectors } from "@/data";
import { usePost } from "@/hooks";
import type { Brief, BriefRequest } from "@/lib/brief";
import styles from "./page.module.css";

const emptyRequest = { company: "", sector: sectors[0], work: "", headcount: "", months: "" };

export default function BriefPage() {
  const [form, setForm] = useState(emptyRequest);
  const { state, run } = usePost<BriefRequest, Brief>("/api/brief");

  const brief = state.status === "done" ? state.data : null;
  const complete =
    form.company && form.work && Number(form.headcount) > 0 && Number(form.months) > 0;

  const field = (name: keyof typeof emptyRequest) => ({
    value: form[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [name]: event.target.value }),
  });

  function submit(event: React.FormEvent) {
    event.preventDefault();
    run({ ...form, headcount: Number(form.headcount), months: Number(form.months) });
  }

  return (
    <>
      <header className={styles.intro}>
        <p className="eyebrow rise">Entry brief</p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          Describe the centre you plan to open.
        </h1>
        <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
          The brief is written only from claims on the record. A sentence that cites nothing, or
          states a figure its sources do not, is removed before you see it.
        </p>
      </header>

      <form className={styles.form} onSubmit={submit}>
        <label>
          Company
          <input placeholder="Your company" {...field("company")} />
        </label>
        <label>
          Sector
          <select {...field("sector")}>
            {sectors.map((sector) => (
              <option key={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <label className={styles.wide}>
          Work the centre will do
          <input placeholder="e.g. platform engineering and data" {...field("work")} />
        </label>
        <label>
          Planned headcount
          <input type="number" min={1} placeholder="100" {...field("headcount")} />
        </label>
        <label>
          Months to go-live
          <input type="number" min={1} placeholder="9" {...field("months")} />
        </label>
        <button type="submit" disabled={!complete || state.status === "loading"}>
          {state.status === "loading" ? "Writing…" : "Write the brief"}
        </button>
      </form>

      {state.status === "missing_key" && <MissingKeyNotice />}
      {state.status === "error" && <p className={styles.error}>{state.message}</p>}

      {brief && (
        <article className={styles.brief}>
          <p className={styles.basis}>
            Written from {brief.claimsConsidered} claims.{" "}
            {brief.dropped.length > 0
              ? `${brief.dropped.length} unsupported ${brief.dropped.length === 1 ? "sentence was" : "sentences were"} removed.`
              : "No sentences had to be removed."}
          </p>

          {brief.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.sentences.map((sentence, index) => (
                <div
                  key={index}
                  className={`${styles.sentence} rise`}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <p>{sentence.text}</p>
                  <ul>
                    {sentence.claimIds.map((id) => {
                      const cite = brief.citations[id];
                      return (
                        <li key={id}>
                          <Link href={cite.href}>
                            {cite.entity} · {cite.label}: {cite.value}
                          </Link>
                          <a href={cite.url} target="_blank" rel="noreferrer">
                            {cite.publisher}, {cite.asOf}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {brief.gaps.length > 0 && (
            <section>
              <h2>Not on the record</h2>
              <ul className={styles.gaps}>
                {brief.gaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </section>
          )}

          {brief.dropped.length > 0 && (
            <details className={styles.dropped}>
              <summary>Removed sentences</summary>
              <ul>
                {brief.dropped.map((item, index) => (
                  <li key={index}>
                    <span>{item.text}</span>
                    <span>{item.reason}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </article>
      )}
    </>
  );
}
