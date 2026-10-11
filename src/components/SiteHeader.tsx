import Link from "next/link";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/record", label: "Record" },
  { href: "/ingest", label: "Ingest" },
  { href: "/brief", label: "Entry brief" },
  { href: "/method", label: "Method" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark}>
          Pramaan
        </Link>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
