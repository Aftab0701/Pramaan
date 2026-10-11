import styles from "./Receipt.module.css";

interface ReceiptProps {
  value: string;
  counts?: string;
  publisher: string;
  asOf: string;
  url: string;
  sells?: string;
}

/** One published figure with everything needed to check it. */
export function Receipt({ value, counts, publisher, asOf, url, sells }: ReceiptProps) {
  return (
    <li className={styles.receipt}>
      <div>
        <span className={styles.value}>{value}</span>
        {counts && <span className={styles.counts}>{counts}</span>}
      </div>
      <div className={styles.source}>
        <a href={url} target="_blank" rel="noreferrer">
          {publisher}
        </a>
        <span>{asOf}</span>
        {sells && <span className={styles.sells}>Publisher sells: {sells}</span>}
      </div>
    </li>
  );
}
