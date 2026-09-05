import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled, PLAN_PRICE_IDS } from "@/lib/stripe";

function tierForPriceId(priceId: string | undefined): "PRO" | "MAX" | null {
  if (!priceId) return null;
  if (priceId === PLAN_PRICE_IDS["pro-monthly"] || priceId === PLAN_PRICE_IDS["pro-yearly"]) {
    return "PRO";
  }
  if (priceId === PLAN_PRICE_IDS["max-monthly"] || priceId === PLAN_PRICE_IDS["max-yearly"]) {
    return "MAX";
  }
  return null;
}

export async function POST(request: Request) {
  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    if (!webhookSecret || !signature) throw new Error("Missing webhook secret or signature");
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const priceId = subscription.items.data[0]?.price.id;
        const tier = tierForPriceId(priceId);
        const userId = session.metadata?.userId ?? session.client_reference_id;

        if (userId && tier) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              tier,
              stripeSubscriptionId: subscription.id,
              stripeCurrentPeriodEnd: new Date(
                (subscription as unknown as { current_period_end: number }).current_period_end * 1000
              ),
            },
          });
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const tier = tierForPriceId(priceId);
      const userId = subscription.metadata?.userId;

      if (userId && tier) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            tier,
            stripeCurrentPeriodEnd: new Date(
              (subscription as unknown as { current_period_end: number }).current_period_end * 1000
            ),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { tier: "FREE", stripeSubscriptionId: null, stripeCurrentPeriodEnd: null },
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
