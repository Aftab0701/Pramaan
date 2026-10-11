import { claimsFor, entity } from "./build";

export const india = entity(
  "market",
  "India",
  "The national picture. Most of these figures have more than one published answer.",
);

export const marketClaims = claimsFor(india.id, [
  ["gcc_count", "2,117", "zinnovLandscape", "FY2026", "Companies with a GCC"],
  ["gcc_count", "~1,700", "vestianCount", "Jul 2025", "GCCs, method not published"],
  ["gcc_count", "1,900+", "nasscomProjection", "2023", "A projection for 2025, made in 2023"],
  ["gcc_count", "536", "flexipleStats", "Aug 2026", "Centres named in a public directory"],

  ["centre_count", "3,728", "zinnovLandscape", "FY2026", "Individual centres, not companies"],
  ["workforce", "2.36 million", "zinnovLandscape", "FY2026"],
  ["revenue", "$98.4 billion", "zinnovLandscape", "FY2026"],

  ["new_gccs", "100+", "zinnovLandscape", "FY2026", "Added in one financial year"],
  ["new_gccs", "200+", "jllViaFlexiple", "2024 to 2025", "Entered over two calendar years"],

  ["attrition", "9%", "eyPulse", "2025", "Survey respondents"],
  ["attrition", "15.1%", "zinnovAttrition", "2025", "Overall attrition"],
  ["attrition", "16.9%", "talent500", "2024", "Overall; voluntary was 12.6%"],
  ["attrition", "15% to 20%", "spagFinn", "2025", "Higher in AI and ML roles"],

  ["leasing_2025", "28 million sq ft", "colliersViaFlexiple", "2025"],
  ["leasing_2025", "31 million sq ft", "jllViaFlexiple", "2025"],
  ["leasing_2025", "34.9 million sq ft", "vestianLeasing2025", "2025", "45% of all absorption"],

  ["pay_premium", "12% to 20%", "teamlease", "FY2025", "Across 15,000 job roles"],
  ["pay_premium", "8% to 15%", "taggd", "2025", "For comparable experience"],

  [
    "setup_time",
    "4 to 6 months",
    "flexipleSetup",
    "2026",
    "Incorporation to working bank accounts",
  ],
  [
    "bot_cost",
    "$0.8M to $2M",
    "ecorpit",
    "2026",
    "A 20 to 50 person centre over an 18 to 24 month concession",
  ],
]);
