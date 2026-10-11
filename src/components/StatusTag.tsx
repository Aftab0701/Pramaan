import type { FactStatus } from "@/lib/types";
import styles from "./StatusTag.module.css";

const labels: Record<FactStatus, string> = {
  disputed: "Sources disagree",
  corroborated: "Corroborated",
  single: "Single source",
};

export function StatusTag({ status }: { status: FactStatus }) {
  return <span className={`${styles.tag} ${styles[status]}`}>{labels[status]}</span>;
}
