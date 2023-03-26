import { Request, Response } from "express";
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const { lineItems, subtotal } = req.body;
      let shippingAmount;
      let shippingName;
      if (subtotal < 99) {
        shippingAmount = 2000;
        shippingName = 'Standard Shipping';
      } else {
        shippingAmount = 0;
        shippingName = 'Free Shipping';
      };

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['US'] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { currency: 'usd', amount: shippingAmount },
              display_name: shippingName,
            },
          },
        ],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout/success?success_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json({ session });
    } catch (error) {
      res.status(500).json('Internal Server Error');
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}