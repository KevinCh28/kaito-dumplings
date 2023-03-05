import express from "express";
const router = express.Router();
import Cart from "../../database/schemas/Cart";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

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

// Update Cart to increase a product quantity
// Put /api/carts/:id/increase
router.put("/:id/increase", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, productId } = req.body;
  try {
    let products: { quantity: number; productId?: Types.ObjectId | undefined; }[] = [];
    const cart = await Cart.findOne({ owner: userId });

    if (cart) products = cart.products;
    if (products.length === 0) {
      products.push({ productId: productId, quantity: 1 });
      await cart?.save();
      return res.status(200).json(cart);
    }

    for (let product of products) {
      if (Object(product.productId).equals(productId)) {
        product.quantity += 1;
        await cart?.save();
        return res.status(200).json(cart);
      };
      if (!Object(product.productId).equals(productId)) {
        products.push({ productId: productId, quantity: 1 });
        await cart?.save();
        return res.status(200).json(cart);
      }
    };
  } catch (err) {
    return next(err);
  };
});

export default router;