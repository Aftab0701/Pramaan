import styles from "./MissingKeyNotice.module.css";

export function MissingKeyNotice() {
  return (
    <div className={styles.notice} role="alert">
      <strong>No model key is configured.</strong>
      <p>
        Copy <code>.env.example</code> to <code>.env.local</code>, add a key from Groq or Google AI
        Studio as <code>LLM_API_KEY</code>, and restart the server.
      </p>
    </div>
  );
}
