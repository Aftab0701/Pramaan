import Link from "next/link";
import { GccTable, type GccTableRow } from "@/components";
import { sectors } from "@/data";
import { listEntities, valueOf } from "@/lib/record";
import styles from "./page.module.css";

export const metadata = { title: "Record · Pramaan" };

export default function RecordPage() {
  const cities = listEntities("city");
  const policies = listEntities("policy");

  const rows: GccTableRow[] = listEntities("gcc").map((gcc) => ({
    name: gcc.name,
    href: `/record/gcc/${gcc.slug}`,
    sector: valueOf(gcc.id, "sector") ?? "",
    hq: valueOf(gcc.id, "parent_hq") ?? "",
    since: valueOf(gcc.id, "india_since"),
    headcount: valueOf(gcc.id, "headcount_india"),
    partner: valueOf(gcc.id, "setup_partner"),
  }));

  return (
    <>
      <header className={styles.intro}>
        <p className="eyebrow rise">The record</p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          What is on file
        </h1>
        <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>
          A seed set, entered by hand from public sources in October 2026. A blank cell means no
          source states it.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Cities</h2>
        <div className={styles.cities}>
          {cities.map((city) => (
            <Link key={city.id} href={`/record/city/${city.slug}`} className={styles.city}>
              <span className={styles.cityName}>{city.name}</span>
              <span className={styles.cityFigure}>{valueOf(city.id, "se_median_pay")}</span>
              <span className={styles.cityLabel}>software engineer median</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>State policies</h2>
        <ul className={styles.policies}>
          {policies.map((policy) => (
            <li key={policy.id}>
              <Link href={`/record/policy/${policy.slug}`}>{policy.name}</Link>
              <span>{valueOf(policy.id, "target_gccs")}</span>
              <span>{valueOf(policy.id, "period")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>GCCs</h2>
        <GccTable rows={rows} sectors={sectors} />
      </section>
    </>
  );
}
