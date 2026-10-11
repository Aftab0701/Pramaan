"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./GccTable.module.css";

export interface GccTableRow {
  name: string;
  href: string;
  sector: string;
  hq: string;
  since?: string;
  headcount?: string;
  partner?: string;
}

interface GccTableProps {
  rows: GccTableRow[];
  sectors: string[];
}

export function GccTable({ rows, sectors }: GccTableProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");

  const needle = query.trim().toLowerCase();
  const visible = rows.filter(
    (row) =>
      (!sector || row.sector === sector) &&
      (!needle || `${row.name} ${row.hq} ${row.partner ?? ""}`.toLowerCase().includes(needle)),
  );

  return (
    <div>
      <div className={styles.filters}>
        <input
          type="search"
          placeholder="Search by company, headquarters or partner"
          aria-label="Search GCCs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          aria-label="Filter by sector"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
        >
          <option value="">All sectors</option>
          {sectors.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <span className={styles.count}>
          {visible.length} of {rows.length}
        </span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Sector</th>
            <th>Parent HQ</th>
            <th>Since</th>
            <th>Tracked in India</th>
            <th>Setup partner</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row.href}>
              <td>
                <Link href={row.href}>{row.name}</Link>
              </td>
              <td>{row.sector}</td>
              <td>{row.hq}</td>
              <td>{row.since ?? <Blank />}</td>
              <td>{row.headcount ?? <Blank />}</td>
              <td>{row.partner ?? <Blank />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {visible.length === 0 && <p className={styles.empty}>Nothing on the record matches.</p>}
    </div>
  );
}

/** An empty cell means no source states it. The record does not estimate. */
function Blank() {
  return (
    <span className={styles.blank} title="No source on record">
      not on record
    </span>
  );
}
