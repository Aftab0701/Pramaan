import type { Claim, Entity } from "@/lib/types";
import { cities, cityClaims } from "./cities";
import { gccClaims, gccs } from "./gccs";
import { india, marketClaims } from "./market";
import { policies, policyClaims } from "./policies";

export { fields, reconciliations } from "./fields";
export { sectors } from "./gccs";
export { sources, type SourceId } from "./sources";

export const entities: Entity[] = [india, ...cities, ...policies, ...gccs];
export const claims: Claim[] = [...marketClaims, ...cityClaims, ...policyClaims, ...gccClaims];
