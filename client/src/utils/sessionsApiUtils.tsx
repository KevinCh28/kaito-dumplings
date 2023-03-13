const keys = require("../../../config/keys");
const stripeKey = keys.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(stripeKey);

export const checkout = async (items: Array) => {
  try {
    const lineItems = items.map((item) => ({ price: item.product.stripeId, quantity: item.quantity }));
    const { session } = await fetch('/api/stripe/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    }).then((res) => res.json())

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    if (error) {
      if (error instanceof Error) throw new Error(error.message);
    } else {
      throw error
    }
  } catch (error) {
    console.log(error);
  }
};