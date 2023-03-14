import { Request, Response } from "express";
const keys = require("../../../../../config/keys");
import Stripe from 'stripe';
const stripe = new Stripe(keys.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

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