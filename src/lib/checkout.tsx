const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

import { Stripe, loadStripe } from "@stripe/stripe-js";
let stripePromise: Promise<Stripe | null>;

export const checkout = async (items: Array<{ quantity: number, product: { stripeId: string } }>, subtotal: number) => {
  try {
    const lineItems = items.map((item: { quantity: number, product: { stripeId: string } }) => ({ price: item.product.stripeId, quantity: item.quantity }));
    const { session } = await fetch('/api/stripe/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems, subtotal }),
    }).then((res) => res.json())

    if (!stripePromise) {
      stripePromise = loadStripe(stripeKey);
    }

    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) {
        if (error instanceof Error) throw new Error(error.message);
      } else {
        throw error
      }
    }
  } catch (error) {
    console.log(error);
  }
}