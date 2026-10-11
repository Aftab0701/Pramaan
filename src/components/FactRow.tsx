"use client";

import { useId, useState } from "react";
import { sources, type SourceId } from "@/data";
import type { Fact } from "@/lib/types";
import { Receipt } from "./Receipt";
import { StatusTag } from "./StatusTag";
import styles from "./FactRow.module.css";

interface FactRowProps {
  fact: Fact;
  defaultOpen?: boolean;
}

/** A figure on the record. Closed, it shows every published value; open, it shows who said each one. */
export function FactRow({ fact, defaultOpen = false }: FactRowProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const values = [...new Set(fact.claims.map((claim) => claim.value))];
  const isLong = values.some((value) => value.length > 28);

  return (
    <div className={styles.row} data-open={open}>
      <button
        type="button"
        className={styles.summary}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.label}>{fact.label}</span>
        <span className={isLong ? styles.prose : styles.values}>
          {values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </span>
        <span className={styles.meta}>
          <StatusTag status={fact.status} />
          <span className={styles.toggle} aria-hidden>
            +
          </span>
        </span>
      </button>

      <div id={panelId} className={styles.panel}>
        <div className={styles.panelInner}>
          <ul>
            {fact.claims.map((claim) => {
              const source = sources[claim.sourceId as SourceId];
              return (
                <Receipt
                  key={claim.id}
                  value={claim.value}
                  counts={claim.counts}
                  asOf={claim.asOf}
                  publisher={source.publisher}
                  url={source.url}
                  sells={"sells" in source ? source.sells : undefined}
                />
              );
            })}
          </ul>
          {fact.reconciliation && (
            <p className={styles.reconciliation}>
              <strong>Why they differ.</strong> {fact.reconciliation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
