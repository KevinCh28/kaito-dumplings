import express from "express";
const router = express.Router();
import Cart from "../../database/schemas/Cart";
import { Request, Response, NextFunction } from "express";

// Get User's Cart
// Get /api/carts/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ owner: req.params.id });
    return res.json(cart);
  } catch (err) {
    res.status(404).json({ err: "Cart not found" });
  }
});

// Create a New Cart
// Post /api/carts
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const cart = await Cart.findOne({ owner: req.body.userId });
  if (cart) {
    return res.status(400).json({ err: "Cart already exists" });
  };
  
  const newCart = new Cart({
    owner: req.body.userId,
    products: [],
  });

  try {
    const result = await newCart.save();
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  };
});

// Update Cart
// Put /api/carts/:id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOneAndUpdate({ owner: req.params.id }, { $set: req.body }, { new: true });
    return res.status(200).json(cart);
  } catch (err) {
    return next(err);
  };
});

export default router;