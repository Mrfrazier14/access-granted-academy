export type Tier = "FREE" | "PRO" | "MAX";

const TIER_RANK: Record<Tier, number> = {
  FREE: 0,
  PRO: 1,
  MAX: 2,
};

export function hasAccess(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier];
}

export function tierLabel(tier: Tier): string {
  if (tier === "FREE") return "Free";
  if (tier === "PRO") return "Pro";
  return "Max";
}
