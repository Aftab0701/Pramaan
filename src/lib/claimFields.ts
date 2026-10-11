/** Shared by the ingest page and the extraction route, so it must stay free of server code. */
export const extractableFields = {
  city: "City of the centre",
  headcount: "Current headcount",
  planned_headcount: "Planned headcount",
  opening_date: "Opening or announcement date",
  investment: "Investment committed",
  office_space: "Office space taken",
  function: "Work the centre does",
  setup_partner: "Advisor, operator or other partner named",
  parent_hq: "Parent headquarters",
} as const;

export interface ExtractedClaim {
  entity: string;
  field: string;
  value: string;
  quote: string;
}

export interface RejectedClaim extends ExtractedClaim {
  reason: string;
}
