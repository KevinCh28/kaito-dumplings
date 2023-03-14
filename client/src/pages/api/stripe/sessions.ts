import { Request, Response } from "express";
import "dotenv/config";
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const { lineItems } = req.body;
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        // success_url: `${req.headers.origin}/?success_id={CHECKOUT_SESSION_ID}`,
        success_url: `${req.headers.origin}/account/?success=true`,
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