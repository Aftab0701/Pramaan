import styles from "./HighlightedArticle.module.css";

interface HighlightedArticleProps {
  article: string;
  quotes: string[];
  /** The quote the reader is hovering in the claim list, drawn stronger than the rest. */
  active?: string;
}

/** Splits the article around each quote so the supporting sentences can be marked in place. */
function segment(article: string, quotes: string[]) {
  const lower = article.toLowerCase();
  const spans = quotes
    .map((quote) => ({ quote, start: lower.indexOf(quote.trim().toLowerCase()) }))
    .filter((span) => span.start >= 0)
    .sort((a, b) => a.start - b.start);

  const parts: { text: string; quote?: string }[] = [];
  let cursor = 0;
  for (const { quote, start } of spans) {
    if (start < cursor) continue;
    const end = start + quote.trim().length;
    parts.push({ text: article.slice(cursor, start) });
    parts.push({ text: article.slice(start, end), quote });
    cursor = end;
  }
  parts.push({ text: article.slice(cursor) });
  return parts;
}

export function HighlightedArticle({ article, quotes, active }: HighlightedArticleProps) {
  return (
    <p className={styles.article}>
      {segment(article, quotes).map((part, index) =>
        part.quote ? (
          <mark key={index} data-active={part.quote === active}>
            {part.text}
          </mark>
        ) : (
          part.text
        ),
      )}
    </p>
  );
}
