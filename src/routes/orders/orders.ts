import express from "express";
const router = express.Router();
import Order from "../../database/schemas/Order";
import validateOrderInput from "../../validation/order";
import { Request, Response, NextFunction } from "express";

// Get all orders (Admin)
// GET /api/orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(404).json([]);
  }
});

// Get a single order's information (Admin)
// GET /api/orders/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.json(order);
  } catch (err) {
    return res.status(404).json("Order not found");
  }
});

// Get all orders for a user
// GET /api/orders/user/:id
router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ owner: req.params.id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(404).json([]);
  }
});

// Get a single order's information (User)
// GET /api/orders/user/:id/:orderNumber
router.get("/user/:id/:orderNumber", async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ owner: req.params.id, orderNumber: req.params.orderNumber });
    return res.json(order);
  } catch (err) {
    return res.status(404).json("Order not found");
  }
});

// Create a new order
// POST /api/orders/create
router.post("/create", validateOrderInput, async (req: Request, res: Response, next: NextFunction) => {
  let newOrderNum = "W" + Math.floor(Math.random() * 1000000000).toString()
  const order = await Order.find({ orderNumber: newOrderNum });

  if (order) {
    newOrderNum = "W" + Math.floor(Math.random() * 1000000000).toString()
  }

  const newOrder = new Order({
    owner: req.body.owner,
    orderNumber: newOrderNum,
    orderStatus: "pending",
    total: req.body.total,
    products: req.body.products,
    date: new Date().toString(),
  });

  try {
    const makeOrder = await newOrder.save();
    return res.status(200).json(makeOrder);
  } catch (err) {
    return next(err);
  };
});

// Update an order's status (Admin)
// PUT /api/orders/:id
router.put("/:id", async (req: Request, res: Response) => {
  Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true }, (err, order) => {
    if (err) {
      return res.status(404).json("Order not found");
    } else {
      return res.status(200).json(order);
    }
  });
});

// Update an order's status (Admin)
// PATCH /api/orders/:id
router.patch("/:id", async (req: Request, res: Response) => {
  Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true }, (err, order) => {
    if (err) {
      return res.status(404).json("Order not found");
    } else {
      return res.status(200).json(order);
    }
  });
});

// Update an order's status (User)
// PUT /api/orders/user/:id/:orderNumber
router.put("/user/:id/:orderNumber", async (req: Request, res: Response) => {
  Order.findOneAndUpdate({ owner: req.params.id, orderNumber: req.params.orderNumber }, { orderStatus: req.body.orderStatus }, { new: true }, (err, order) => {
    if (err) {
      return res.status(404).json("Order not found");
    } else {
      return res.status(200).json(order);
    }
  });
});

// Update an order's status (User)
// PATCH /api/orders/user/:id/:orderNumber
router.patch("/user/:id/:orderNumber", async (req: Request, res: Response) => {
  Order.findOneAndUpdate({ owner: req.params.id, orderNumber: req.params.orderNumber }, { orderStatus: req.body.orderStatus }, { new: true }, (err, order) => {
    if (err) {
      return res.status(404).json("Order not found");
    } else {
      return res.status(200).json(order);
    }
  });
});

export default router;