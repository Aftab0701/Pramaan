import type { Claim, Entity, EntityKind } from "@/lib/types";
import type { SourceId } from "./sources";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function entity(kind: EntityKind, name: string, summary?: string): Entity {
  const slug = slugify(name);
  return { id: `${kind}/${slug}`, kind, slug, name, summary };
}

export type ClaimInput = [
  field: string,
  value: string,
  sourceId: SourceId,
  asOf: string,
  counts?: string,
];

/** Ids are derived from content so a citation survives reordering the seed files. */
export function claimsFor(entityId: string, rows: ClaimInput[]): Claim[] {
  return rows.map(([field, value, sourceId, asOf, counts]) => ({
    id: `${entityId}:${field}:${sourceId}`,
    entityId,
    field,
    value,
    sourceId,
    asOf,
    counts,
  }));
}
