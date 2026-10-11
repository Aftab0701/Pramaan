import type { Claim, Entity } from "@/lib/types";
import { claimsFor, entity, type ClaimInput } from "./build";
import type { SourceId } from "./sources";

interface GccRow {
  name: string;
  hq: string;
  sector: string;
  since?: number;
  india?: string;
  bengaluru?: string;
  hyderabad?: string;
  /** Anything beyond the standard columns: [field, value, source, as of]. */
  extra?: [string, string, SourceId, string][];
}

const BFSI = "BFSI";
const TECH = "Technology";
const ENG = "Engineering and industrial";
const PHARMA = "Healthcare and pharma";
const RETAIL = "Retail and consumer";
const ENERGY = "Energy";
const MEDIA = "Telecom and media";

// Read from Flexiple's public directory pages in October 2026. Headcounts are Flexiple's
// tracked professionals, which is a floor on real headcount and not an official figure.
const rows: GccRow[] = [
  {
    name: "JPMorganChase",
    hq: "New York, US",
    sector: BFSI,
    since: 2002,
    india: "42k+",
    bengaluru: "18k+",
    hyderabad: "7,000+",
  },
  {
    name: "Wells Fargo",
    hq: "San Francisco, US",
    sector: BFSI,
    since: 2006,
    india: "28k+",
    bengaluru: "12k+",
    hyderabad: "11k+",
  },
  {
    name: "Goldman Sachs",
    hq: "New York, US",
    sector: BFSI,
    since: 2004,
    india: "10k+",
    bengaluru: "6,900+",
    hyderabad: "1,500+",
  },
  {
    name: "HSBC",
    hq: "London, UK",
    sector: BFSI,
    since: 2000,
    india: "31k+",
    bengaluru: "10k+",
    hyderabad: "8,200+",
  },
  {
    name: "State Street",
    hq: "Boston, US",
    sector: BFSI,
    since: 2004,
    india: "13k+",
    bengaluru: "4,600+",
    hyderabad: "3,100+",
    extra: [["operating_model", "Fully in-house since 2023", "flexipleBengaluru", "2023"]],
  },
  {
    name: "Commonwealth Bank",
    hq: "Sydney, Australia",
    sector: BFSI,
    since: 2019,
    india: "5,300+",
    bengaluru: "4,900+",
    hyderabad: "84",
  },
  {
    name: "Revolut",
    hq: "London, UK",
    sector: BFSI,
    since: 2021,
    india: "2,700+",
    bengaluru: "500+",
    hyderabad: "300+",
  },
  {
    name: "Synchrony",
    hq: "Stamford, US",
    sector: BFSI,
    since: 2008,
    india: "3,800+",
    hyderabad: "3,300+",
  },
  {
    name: "DBS Bank",
    hq: "Singapore",
    sector: BFSI,
    since: 2016,
    india: "6,200+",
    bengaluru: "400+",
    hyderabad: "2,600+",
  },
  {
    name: "Western Union",
    hq: "Denver, US",
    sector: BFSI,
    india: "600+",
    hyderabad: "55",
    extra: [
      ["setup_partner", "HCLTech", "flexipleHyderabad", "2026"],
      ["expansion", "AI-led Hyderabad GCC, run with HCLTech", "flexipleHyderabad", "2026"],
    ],
  },
  {
    name: "Dai-ichi Life",
    hq: "Tokyo, Japan",
    sector: BFSI,
    extra: [
      ["setup_partner", "Capgemini", "flexipleHyderabad", "Aug 2026"],
      [
        "expansion",
        "Capability centre built with Capgemini support, expanding to 600 people",
        "flexipleHyderabad",
        "Aug 2026",
      ],
    ],
  },
  { name: "Coinbase", hq: "San Francisco, US", sector: BFSI, india: "300+", hyderabad: "200+" },
  { name: "Tide", hq: "United Kingdom", sector: BFSI, india: "900+", hyderabad: "400+" },

  {
    name: "Microsoft",
    hq: "Redmond, US",
    sector: TECH,
    since: 1998,
    india: "41k+",
    bengaluru: "11k+",
    hyderabad: "11k+",
  },
  {
    name: "Google",
    hq: "Mountain View, US",
    sector: TECH,
    since: 2004,
    india: "34k+",
    bengaluru: "10k+",
    hyderabad: "7,500+",
  },
  {
    name: "Amazon",
    hq: "Seattle, US",
    sector: TECH,
    since: 2004,
    india: "127k+",
    bengaluru: "32k+",
    hyderabad: "30k+",
  },
  {
    name: "SAP",
    hq: "Walldorf, Germany",
    sector: TECH,
    since: 1998,
    india: "16k+",
    bengaluru: "12k+",
    hyderabad: "700+",
    extra: [["expansion", "Expanding", "flexipleBengaluru", "2025"]],
  },
  {
    name: "Salesforce",
    hq: "San Francisco, US",
    sector: TECH,
    since: 2016,
    india: "13k+",
    bengaluru: "5,200+",
    hyderabad: "5,400+",
  },
  {
    name: "ServiceNow",
    hq: "Santa Clara, US",
    sector: TECH,
    since: 2018,
    india: "5,300+",
    bengaluru: "1,000+",
    hyderabad: "3,700+",
  },
  {
    name: "Uber",
    hq: "San Francisco, US",
    sector: TECH,
    since: 2016,
    india: "8,300+",
    bengaluru: "2,500+",
    hyderabad: "2,500+",
  },
  {
    name: "Rippling",
    hq: "United States",
    sector: TECH,
    india: "1,200+",
    bengaluru: "1,100+",
    hyderabad: "52",
  },
  {
    name: "Atlassian",
    hq: "Sydney, Australia",
    sector: TECH,
    india: "3,000+",
    bengaluru: "1,700+",
    hyderabad: "200+",
  },
  {
    name: "Accenture",
    hq: "Dublin, Ireland",
    sector: "Professional services",
    india: "253k+",
    bengaluru: "90k+",
    hyderabad: "48k+",
    extra: [
      [
        "classification",
        "Listed as a GCC, tagged services-led because it sells delivery to outside clients",
        "flexipleIndia",
        "Aug 2026",
      ],
    ],
  },

  {
    name: "Bosch Global Software Technologies",
    hq: "Gerlingen, Germany",
    sector: ENG,
    since: 1997,
    india: "18k+",
    bengaluru: "11k+",
    hyderabad: "1,000+",
  },
  {
    name: "Mercedes-Benz R&D India",
    hq: "Stuttgart, Germany",
    sector: ENG,
    since: 1996,
    india: "7,700+",
    bengaluru: "6,800+",
    hyderabad: "100+",
  },
  {
    name: "Airbus",
    hq: "Toulouse, France",
    sector: ENG,
    since: 2007,
    india: "5,100+",
    bengaluru: "3,000+",
    hyderabad: "300+",
    extra: [["expansion", "5,000-seat Bengaluru centre opened", "flexipleBengaluru", "2026"]],
  },
  {
    name: "ZF Group",
    hq: "Friedrichshafen, Germany",
    sector: ENG,
    since: 2017,
    india: "5,500+",
    bengaluru: "300+",
    hyderabad: "1,800+",
    extra: [["note", "Hyderabad is its largest software hub", "flexipleHyderabad", "Aug 2026"]],
  },
  {
    name: "Volvo Group",
    hq: "Gothenburg, Sweden",
    sector: ENG,
    since: 2008,
    india: "3,600+",
    bengaluru: "3,300+",
    hyderabad: "59",
  },

  {
    name: "Novartis",
    hq: "Basel, Switzerland",
    sector: PHARMA,
    since: 2014,
    india: "8,200+",
    bengaluru: "500+",
    hyderabad: "5,900+",
  },
  {
    name: "GSK",
    hq: "London, UK",
    sector: PHARMA,
    since: 2021,
    india: "5,800+",
    bengaluru: "2,400+",
    hyderabad: "400+",
  },
  {
    name: "Eli Lilly",
    hq: "Indianapolis, US",
    sector: PHARMA,
    india: "3,500+",
    bengaluru: "2,700+",
    hyderabad: "200+",
    extra: [["expansion", "Expanding", "flexipleBengaluru", "2025"]],
  },
  {
    name: "Bristol Myers Squibb",
    hq: "Princeton, US",
    sector: PHARMA,
    india: "2,200+",
    hyderabad: "1,700+",
    extra: [
      ["note", "Hyderabad is its largest site outside the US", "flexipleHyderabad", "Aug 2026"],
    ],
  },
  {
    name: "Evernorth Health Services",
    hq: "St. Louis, US",
    sector: PHARMA,
    india: "1,400+",
    hyderabad: "1,300+",
  },

  {
    name: "Walmart Global Tech",
    hq: "Bentonville, US",
    sector: RETAIL,
    india: "9,900+",
    bengaluru: "7,700+",
    hyderabad: "200+",
  },
  {
    name: "Target",
    hq: "Minneapolis, US",
    sector: RETAIL,
    since: 2005,
    india: "6,100+",
    bengaluru: "5,300+",
    hyderabad: "100+",
  },
  {
    name: "Tesco Bengaluru",
    hq: "Welwyn Garden City, UK",
    sector: RETAIL,
    since: 2004,
    india: "3,200+",
    bengaluru: "3,100+",
    hyderabad: "51",
  },
  {
    name: "Lowe's India",
    hq: "Mooresville, US",
    sector: RETAIL,
    india: "3,500+",
    bengaluru: "3,400+",
    hyderabad: "37",
  },
  { name: "Deliveroo", hq: "London, UK", sector: RETAIL, india: "300+", hyderabad: "200+" },
  {
    name: "Costco",
    hq: "Issaquah, US",
    sector: RETAIL,
    extra: [["expansion", "Hyderabad centre announced", "flexipleHyderabad", "2025"]],
  },
  {
    name: "American Airlines",
    hq: "Fort Worth, US",
    sector: RETAIL,
    extra: [
      [
        "expansion",
        "Hyderabad tech hub expanding toward 800 engineers",
        "flexipleHyderabad",
        "2026",
      ],
    ],
  },
  {
    name: "HEINEKEN",
    hq: "Amsterdam, Netherlands",
    sector: RETAIL,
    extra: [["expansion", "Hyderabad digital hub", "flexipleHyderabad", "2026"]],
  },

  {
    name: "Shell",
    hq: "London, UK",
    sector: ENERGY,
    since: 2006,
    india: "12k+",
    bengaluru: "5,900+",
    hyderabad: "400+",
  },
  { name: "bp", hq: "London, UK", sector: ENERGY, since: 2021, india: "3,500+", bengaluru: "300+" },
  { name: "DAZN", hq: "London, UK", sector: MEDIA, india: "1,000+", hyderabad: "900+" },
];

export const gccs: Entity[] = rows.map((row) => entity("gcc", row.name));

export const gccClaims: Claim[] = rows.flatMap((row, i) => {
  const tracked = "Tracked professionals, a floor on real headcount";
  const inputs: ClaimInput[] = [
    ["parent_hq", row.hq, "flexipleIndia", "Aug 2026"],
    ["sector", row.sector, "flexipleIndia", "Aug 2026"],
  ];
  if (row.since) inputs.push(["india_since", String(row.since), "flexipleIndia", "Aug 2026"]);
  if (row.india) inputs.push(["headcount_india", row.india, "flexipleIndia", "Aug 2026", tracked]);
  if (row.bengaluru) {
    inputs.push(["headcount_bengaluru", row.bengaluru, "flexipleBengaluru", "Aug 2026", tracked]);
  }
  if (row.hyderabad) {
    inputs.push(["headcount_hyderabad", row.hyderabad, "flexipleHyderabad", "Aug 2026", tracked]);
  }
  return claimsFor(gccs[i].id, [...inputs, ...(row.extra ?? [])]);
});

export const sectors = [...new Set(rows.map((row) => row.sector))].sort();
