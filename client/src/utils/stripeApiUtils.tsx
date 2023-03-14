const keys = require("../../../config/keys");
const stripeKey = keys.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

import { Stripe, loadStripe } from "@stripe/stripe-js";
let stripePromise: Promise<Stripe | null>;

export const checkout = async (items: []) => {
  try {
    const lineItems = items.map((item: { product: { stripeId: string }, quantity: number }) => ({ price: item.product.stripeId, quantity: item.quantity }));
    const { session } = await fetch('/api/stripe/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
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