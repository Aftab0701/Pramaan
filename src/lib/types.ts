export type EntityKind = "market" | "city" | "policy" | "gcc";

export interface Source {
  publisher: string;
  title: string;
  url: string;
  /** What the publisher sells into the GCC market, shown next to every figure it publishes. */
  sells?: string;
}

export interface Entity {
  id: string;
  kind: EntityKind;
  slug: string;
  name: string;
  summary?: string;
}

export interface Claim {
  id: string;
  entityId: string;
  field: string;
  value: string;
  sourceId: string;
  /** When the source says the figure was true, not when we read it. */
  asOf: string;
  /** What the figure counts, where that is not obvious from the field. */
  counts?: string;
}

export type FactStatus = "disputed" | "corroborated" | "single";

export interface Fact {
  field: string;
  label: string;
  status: FactStatus;
  claims: Claim[];
  /** Why the sources differ, written by a person. Only present on disputed facts. */
  reconciliation?: string;
}
