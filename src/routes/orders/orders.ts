import express from "express";
const router = express.Router();
import Order from "../../database/schemas/Order";
import validateOrderInput from "../../validation/order";
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
// POST /api/orders/create
router.post("/create", validateOrderInput, async (req: Request, res: Response, next: NextFunction) => {
  let orderNumber = "W" + Math.floor(Math.random() * 1000000000).toString()
  const order = await Order.find({ orderNumber: orderNumber });

  if (order) {
    orderNumber = "W" + Math.floor(Math.random() * 1000000000).toString()
  };

  if (!order) {
    const newOrder = new Order({
      owner: req.body.owner,
      orderNumber: orderNumber,
      orderStatus: "pending",
      total: req.body.total,
      products: req.body.products,
      date: Date.now().toString(),
    });

    try {
      const order = await newOrder.save();
      return res.status(200).json(order);
    } catch (err) {
      return next(err);
    };
  }
});

// Delete an order, only is the status is "pending"
// DELETE /api/orders/:id

export default router;