import type { EntityKind } from "@/lib/types";

/** Display label for each field, in the order it appears on a record page. */
export const fields: Record<EntityKind, Record<string, string>> = {
  market: {
    gcc_count: "GCCs in India",
    centre_count: "GCC centres",
    workforce: "People employed",
    revenue: "Revenue",
    new_gccs: "New GCCs",
    attrition: "Annual attrition",
    leasing_2025: "Office space leased by GCCs, 2025",
    pay_premium: "Pay premium over IT services",
    setup_time: "Time to set up an entity",
    bot_cost: "Cost of a build-operate-transfer deal",
  },
  city: {
    gcc_presence: "GCC presence",
    se_median_pay: "Software engineer median pay",
    senior_median_pay: "Senior engineer median pay",
    tracked_professionals: "Professionals tracked",
    leasing_share: "GCC share of office leasing",
  },
  policy: {
    period: "Policy period",
    target_gccs: "Target: new GCCs",
    target_jobs: "Target: jobs",
    incentives: "Incentives",
    eligibility: "Eligibility",
  },
  gcc: {
    parent_hq: "Parent headquarters",
    sector: "Sector",
    classification: "Classification",
    india_since: "In India since",
    headcount_india: "Tracked headcount, India",
    headcount_bengaluru: "Tracked headcount, Bengaluru",
    headcount_hyderabad: "Tracked headcount, Hyderabad",
    setup_partner: "Setup partner",
    operating_model: "Operating model",
    expansion: "Expansion",
    note: "Note",
  },
};

/** Written by hand for facts where the sources differ and the reason is known. */
export const reconciliations: Record<string, string> = {
  "market/india:gcc_count":
    "Four different things are being counted: a census for FY2026, a real estate firm's 2025 estimate, a 2023 projection that is still quoted as a count, and a directory of centres that can be named. None is wrong.",
  "market/india:attrition":
    "Different years, different samples, and no shared definition of attrition. EY's figure comes from a survey; Talent500's includes involuntary exits.",
  "market/india:leasing_2025":
    "Each firm reports from its own view of the market and none publishes how it decides a lease is a GCC lease.",
  "market/india:pay_premium":
    "Both come from recruiters comparing roles they placed. Neither publishes the sample behind the range.",
  "market/india:new_gccs":
    "One figure is for a single financial year, the other for two calendar years.",
  "city/bengaluru:gcc_presence":
    "JLL counts offices, the state counts companies across all of Karnataka, and Flexiple counts only the centres it can name with a source.",
  "city/hyderabad:gcc_presence":
    "One is a share of a national total that is itself disputed; the other is a count of named centres.",
};
