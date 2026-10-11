import Link from "next/link";
import { FactRow } from "@/components";
import { factsFor, getEntity, recordTotals } from "@/lib/record";
import styles from "./page.module.css";

const doors = [
  {
    href: "/ingest",
    title: "Ingest",
    body: "Paste a press release. Get the facts in it, each tied to the sentence it came from.",
  },
  {
    href: "/record",
    title: "Record",
    body: "Cities, state policies and GCCs. Every figure opens to show who published it.",
  },
  {
    href: "/brief",
    title: "Entry brief",
    body: "Describe a centre you plan to open. Get a one-page brief built only from the record.",
  },
];

export default function Home() {
  const india = getEntity("market", "india")!;
  const facts = factsFor(india);
  const totals = recordTotals();

  return (
    <>
      <section className={styles.hero}>
        <p className="eyebrow rise">The record of India&apos;s GCC ecosystem</p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          How many GCCs does India have? It depends who you ask.
        </h1>
        <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
          Pramaan keeps every published answer, with its source, its date and what it counts. Open
          any figure below.
        </p>
      </section>

      <section className="rise" style={{ "--i": 3 } as React.CSSProperties}>
        {facts.map((fact, index) => (
          <FactRow key={fact.field} fact={fact} defaultOpen={index === 0} />
        ))}
        <p className={styles.totals}>
          {totals.claims} claims on {totals.entities} entities from {totals.publishers} publishers.{" "}
          {totals.disputed} figures have sources that disagree.
        </p>
      </section>

      <section className={styles.doors}>
        {doors.map((door) => (
          <Link key={door.href} href={door.href} className={styles.door}>
            <h2>{door.title}</h2>
            <p>{door.body}</p>
            <span aria-hidden>→</span>
          </Link>
        ))}
      </section>
    </>
  );
}
