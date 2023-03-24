import { Request, Response } from "express";
import Stripe from 'stripe';
const stripeKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    try {
      const sessionId = req.query.sessionId as string;
      if (!sessionId.startsWith('cs_')) {
        throw new Error('Invalid Checkout Session ID');
      }

      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items.data.price.product'],
      })
      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
      return res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed');
  return;
};