import express from "express";
const router = express.Router();
import Order from "../../database/schemas/Order";
import Cart from "../../database/schemas/Cart";
import validateOrderInput from "../../validation/order";
import { Request, Response, NextFunction } from "express";

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
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  let newOrderNum = "W" + Math.floor(Math.random() * 1000000000).toString()
  const order = await Order.find({ orderNumber: newOrderNum });

  while (!order) {
    newOrderNum = "K" + Math.floor(Math.random() * 1000000).toString()
  }

  const newOrder = new Order({
    owner: req.body.userId,
    orderNumber: newOrderNum,
    orderStatus: "pending",
    total: req.body.totalAmount,
    products: req.body.cart,
    date: new Date().toString(),
  });

  try {
    const makeOrder = await newOrder.save();
    const updateCart = await Cart.findOneAndUpdate({ owner: req.body.userId }, { products: [] });

    if (makeOrder && updateCart) {
      return res.status(200).json(makeOrder);
    }
  } catch (err) {
    return next(err);
  }
});

// Update an order's status (User)
// PUT /api/orders/user/:id/:orderNumber
router.put("/user/:id/:orderNumber", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { userId, orderNumber } = req.body;
  const order = await Order.findOne({ owner: userId, orderNumber });
  
  if (!order) {
    return res.status(400).json({ err: "Order does not exist" });
  } else {
    order.orderStatus = "canceled";
    order.save();
    return res.status(200).json(order);
  }
});

// Update an order's status (User)
// PATCH /api/orders/user/:id/:orderNumber
router.patch("/user/:id/:orderNumber", validateOrderInput, async (req: Request, res: Response) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      owner: req.body.owner,
      orderNumber: req.body.orderNumber,
      orderStatus: req.body.orderStatus,
      total: req.body.total,
      products: req.body.products,
      date: req.body.date,
    },
    { new: true }
  )
  .then(order => {
    return res.json(order)
  })
  .catch(err => {
    return res.status(404).json("Order not found");
  });
});

export default router;