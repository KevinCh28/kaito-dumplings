import express from "express";
const router = express.Router();
import Cart from "../../database/schemas/Cart";
import { Request, Response, NextFunction } from "express";

// Get /api/carts/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ owner: req.params.id });
    if (cart) {
      return res.json(cart);
    } else {
      res.status(404).json({ err: "Cart not found" });
    }
  } catch (err) {
    res.status(404).json({ err: "Cart not found" });
  }
});

// Post /api/carts
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const newCart = new Cart({
    owner: req.body.userId,
    products: [],
  });

  try {
    const cart = await newCart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return next(err);
  };
});

export default router;