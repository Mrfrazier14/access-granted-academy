import Stripe from "stripe";

export const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;

export const stripe = stripeEnabled
  ? new Stripe(process.env.STRIPE_SECRET_KEY as string)
  : null;

export const PLAN_PRICE_IDS = {
  "pro-monthly": process.env.STRIPE_PRICE_PRO_MONTHLY,
  "pro-yearly": process.env.STRIPE_PRICE_PRO_YEARLY,
  "max-monthly": process.env.STRIPE_PRICE_MAX_MONTHLY,
  "max-yearly": process.env.STRIPE_PRICE_MAX_YEARLY,
} as const;

export type PlanKey = keyof typeof PLAN_PRICE_IDS;

export function tierForPlan(plan: PlanKey): "PRO" | "MAX" {
  return plan.startsWith("pro") ? "PRO" : "MAX";
}
