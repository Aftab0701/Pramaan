import styles from "./page.module.css";

export const metadata = { title: "Method · Pramaan" };

const rules = [
  {
    title: "The unit is a claim",
    body: "The record does not store “Bengaluru has 900 GCCs”. It stores that JLL India said in February 2026 that Bengaluru has more than 900 GCC units. Every figure carries its publisher, its date and what it counts.",
  },
  {
    title: "Disagreement is shown",
    body: "When two sources give different values for the same field, both stay on the page under a “Sources disagree” tag. Where the reason is known, a person writes it down. The record never averages them.",
  },
  {
    title: "Three statuses, computed",
    body: "Single source: one publisher states it. Corroborated: two or more publishers state the same value. Sources disagree: two or more values are on file. Nobody assigns a confidence score by hand.",
  },
  {
    title: "The publisher's interest is printed",
    body: "Most figures in this market come from firms that sell into it. Each receipt says what its publisher sells, so a reader can weigh a broker's leasing number or a setup firm's timeline accordingly.",
  },
  {
    title: "Blank beats estimated",
    body: "If no source states a value, the cell reads “not on record”. Nothing is interpolated or filled from a model's general knowledge.",
  },
  {
    title: "The model proposes, the server checks",
    body: "On ingest, a claim is kept only if its quoted sentence appears in the article and contains the figure. In a brief, a sentence is kept only if it cites a claim and every number in it appears in what it cites. A person approves anything before it joins the record.",
  },
];

export default function MethodPage() {
  return (
    <>
      <header className={styles.intro}>
        <p className="eyebrow rise">Method</p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          How the record is kept
        </h1>
        <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
          Here a GCC is an India centre owned and run by a company headquartered elsewhere, doing
          work for its own group. Centres that also sell to outside clients are listed and labelled.
        </p>
      </header>

      <ol className={styles.rules}>
        {rules.map((rule, index) => (
          <li key={rule.title} className="rise" style={{ "--i": index + 3 } as React.CSSProperties}>
            <h2>{rule.title}</h2>
            <p>{rule.body}</p>
          </li>
        ))}
      </ol>

      <section className={styles.limits}>
        <h2>What this prototype is not</h2>
        <p>
          The seed set was entered by hand from public pages in October 2026 and covers a small part
          of the market. Most GCC rows rest on one directory. There is no crawler, no entry signals
          feed, and the review queue lives in the browser.
        </p>
      </section>
    </>
  );
}
