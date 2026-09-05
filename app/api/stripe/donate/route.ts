import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe, stripeEnabled } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripeEnabled || !stripe) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Add your Stripe keys to enable donations." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
    return NextResponse.json({ error: "Enter an amount between $1 and $10,000" }, { status: 400 });
  }

  const session = await auth();
  const origin = request.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session?.user?.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: "Donation to Access Granted Academy",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/pricing?donation=success`,
    cancel_url: `${origin}/pricing?donation=cancelled`,
    metadata: { userId: session?.user?.id ?? "anonymous", type: "donation" },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
