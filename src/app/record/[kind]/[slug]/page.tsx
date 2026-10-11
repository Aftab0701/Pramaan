import Link from "next/link";
import { notFound } from "next/navigation";
import { FactRow } from "@/components";
import { entities } from "@/data";
import { factsFor, getEntity } from "@/lib/record";
import type { EntityKind } from "@/lib/types";
import styles from "./page.module.css";

const kindLabels: Record<EntityKind, string> = {
  market: "Market",
  city: "City",
  policy: "State GCC policy",
  gcc: "GCC",
};

export function generateStaticParams() {
  return entities.map((entity) => ({ kind: entity.kind, slug: entity.slug }));
}

export async function generateMetadata({ params }: PageProps<"/record/[kind]/[slug]">) {
  const { kind, slug } = await params;
  const entity = getEntity(kind, slug);
  return { title: entity ? `${entity.name} · Pramaan` : "Not on record · Pramaan" };
}

export default async function EntityPage({ params }: PageProps<"/record/[kind]/[slug]">) {
  const { kind, slug } = await params;
  const entity = getEntity(kind, slug);
  if (!entity) notFound();

  const facts = factsFor(entity);
  const disputed = facts.filter((fact) => fact.status === "disputed").length;

  return (
    <>
      <header className={styles.header}>
        <p className="eyebrow rise">
          <Link href="/record">Record</Link> / {kindLabels[entity.kind]}
        </p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          {entity.name}
        </h1>
        {entity.summary && (
          <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
            {entity.summary}
          </p>
        )}
        <p className={`${styles.count} rise`} style={{ "--i": 3 } as React.CSSProperties}>
          {facts.length} fields on record
          {disputed > 0 && `, ${disputed} where sources disagree`}
        </p>
      </header>

      <section className="rise" style={{ "--i": 4 } as React.CSSProperties}>
        {facts.map((fact) => (
          <FactRow key={fact.field} fact={fact} defaultOpen={fact.status === "disputed"} />
        ))}
      </section>
    </>
  );
}
