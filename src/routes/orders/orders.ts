const express = require("express");
const router = express.Router();
const User = require("../../database/schemas/User");
const Order = require("../../database/schemas/Order");
const Product = require("../../database/schemas/Product");
const validateOrderInput = require("../../validation/order");
import { Request, Response, NextFunction } from "express";

// Get all orders
// GET /api/orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(404).json([]);
  }
});

// Get a single order
// GET /api/orders/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.json(order);
  } catch (err) {
    return res.status(404).json("Order not found");
  }
});

// Create a new order
// POST /api/orders

// Delete an order, only is the status is "pending"
// DELETE /api/orders/:id

export default router;