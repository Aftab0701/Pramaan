import type { Claim, Entity } from "@/lib/types";
import { claimsFor, entity } from "./build";

interface CityRow {
  name: string;
  profiled: string;
  tracked: string;
  sePay: string;
  seniorPay: string;
}

// Flexiple withholds a pay cell when it has fewer than 25 records, so every figure here cleared that bar.
const rows: CityRow[] = [
  { name: "Bengaluru", profiled: "437", tracked: "7.1M+", sePay: "₹15.7L", seniorPay: "₹32.5L" },
  { name: "Hyderabad", profiled: "299", tracked: "5.3M+", sePay: "₹10.4L", seniorPay: "₹24.2L" },
  { name: "Chennai", profiled: "244", tracked: "4.1M+", sePay: "₹7.6L", seniorPay: "₹19.1L" },
  { name: "Mumbai", profiled: "283", tracked: "5.8M+", sePay: "₹9.7L", seniorPay: "₹22.8L" },
  { name: "Pune", profiled: "169", tracked: "2.4M+", sePay: "₹9.5L", seniorPay: "₹22.3L" },
  { name: "Delhi", profiled: "277", tracked: "5M+", sePay: "₹14.1L", seniorPay: "₹24L" },
];

export const cities: Entity[] = rows.map((row) => entity("city", row.name));

const baseClaims: Claim[] = rows.flatMap((row, i) =>
  claimsFor(cities[i].id, [
    [
      "gcc_presence",
      row.profiled,
      "flexipleSetup",
      "Aug 2026",
      "Centres named, each with a source",
    ],
    ["se_median_pay", row.sePay, "flexipleStats", "Aug 2026", "Median of disclosed records"],
    [
      "senior_median_pay",
      row.seniorPay,
      "flexipleStats",
      "Aug 2026",
      "Median of disclosed records",
    ],
    [
      "tracked_professionals",
      row.tracked,
      "flexipleStats",
      "Aug 2026",
      "All professionals, not only GCC staff",
    ],
  ]),
);

const cityId = (name: string) => cities.find((city) => city.name === name)!.id;

const extraClaims: Claim[] = [
  ...claimsFor(cityId("Bengaluru"), [
    ["gcc_presence", "900+", "jllViaFlexiple", "Feb 2026", "GCC units, meaning offices"],
    ["gcc_presence", "500+", "karnatakaViaFlexiple", "2026", "Companies, across all of Karnataka"],
    ["leasing_share", "65%", "vestianFY25", "FY2025", "Share of the city's office absorption"],
  ]),
  ...claimsFor(cityId("Hyderabad"), [
    ["gcc_presence", "About 20% of India's GCCs", "telanganaViaFlexiple", "2025 to 2026"],
    ["leasing_share", "46%", "vestianFY25", "FY2025", "Share of the city's office absorption"],
  ]),
  ...claimsFor(cityId("Chennai"), [
    ["leasing_share", "42.1%", "vestianFY25", "FY2025", "Share of the city's office absorption"],
  ]),
];

export const cityClaims: Claim[] = [...baseClaims, ...extraClaims];
