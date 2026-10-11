import { claims, entities, fields, reconciliations, sources, type SourceId } from "@/data";
import type { Claim, Entity, EntityKind, Fact, FactStatus, Source } from "./types";

const claimsById = new Map(claims.map((claim) => [claim.id, claim]));
const entitiesById = new Map(entities.map((entity) => [entity.id, entity]));

export function listEntities(kind: EntityKind): Entity[] {
  return entities.filter((entity) => entity.kind === kind);
}

export function getEntity(kind: string, slug: string): Entity | undefined {
  return entitiesById.get(`${kind}/${slug}`);
}

export function getEntityById(id: string): Entity | undefined {
  return entitiesById.get(id);
}

export function getClaim(id: string): Claim | undefined {
  return claimsById.get(id);
}

export function sourceOf(claim: Claim): Source {
  return sources[claim.sourceId as SourceId];
}

export function claimsOf(entityId: string): Claim[] {
  return claims.filter((claim) => claim.entityId === entityId);
}

export function valueOf(entityId: string, field: string): string | undefined {
  return claims.find((claim) => claim.entityId === entityId && claim.field === field)?.value;
}

function statusOf(group: Claim[]): FactStatus {
  const values = new Set(group.map((claim) => claim.value.toLowerCase()));
  if (values.size > 1) return "disputed";

  const publishers = new Set(group.map((claim) => sourceOf(claim).publisher));
  return publishers.size > 1 ? "corroborated" : "single";
}

/** Groups an entity's claims by field, in the display order the field registry defines. */
export function factsFor(entity: Entity): Fact[] {
  const own = claimsOf(entity.id);

  return Object.entries(fields[entity.kind]).flatMap(([field, label]) => {
    const group = own.filter((claim) => claim.field === field);
    if (group.length === 0) return [];

    // A policy can list several incentives from several sources; those add up rather than conflict.
    const additive = entity.kind === "policy";
    const status = additive ? "single" : statusOf(group);

    return [
      {
        field,
        label,
        status,
        claims: group,
        reconciliation: reconciliations[`${entity.id}:${field}`],
      },
    ];
  });
}

export interface Citation {
  id: string;
  entity: string;
  href: string;
  label: string;
  value: string;
  counts?: string;
  asOf: string;
  publisher: string;
  url: string;
}

/** A claim flattened with its entity and source, for sending to the browser. */
export function toCitation(claim: Claim): Citation {
  const entity = entitiesById.get(claim.entityId)!;
  const source = sourceOf(claim);
  return {
    id: claim.id,
    entity: entity.name,
    href: `/record/${entity.kind}/${entity.slug}`,
    label: fields[entity.kind][claim.field] ?? claim.field,
    value: claim.value,
    counts: claim.counts,
    asOf: claim.asOf,
    publisher: source.publisher,
    url: source.url,
  };
}

export function recordTotals() {
  const facts = entities.flatMap(factsFor);
  return {
    entities: entities.length,
    gccs: listEntities("gcc").length,
    claims: claims.length,
    publishers: new Set(Object.values(sources).map((source) => source.publisher)).size,
    disputed: facts.filter((fact) => fact.status === "disputed").length,
  };
}
