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
  const { userId, product, amount } = req.body;
  try {
    let newProducts: {
      quantity: number;
      product: Object;
      productId?: Types.ObjectId | undefined;
    }[] = [];
    const cart = await Cart.findOne({ owner: userId });

    if (cart) newProducts = cart.products;
    if (newProducts.length === 0) {
      newProducts.push({
        productId: product._id,
        product,
        quantity: amount 
      });
      await cart?.save();
      return res.status(200).json(cart);
    }

    for (let cartProduct of newProducts) {
      if (Object(cartProduct.productId).equals(product.productId)) {
        cartProduct.quantity += amount;
        await cart?.save();
        return res.status(200).json(cart);
      }
    };
    newProducts.push({
      productId: product._id,
      product,
      quantity: amount
    });
    await cart?.save();
    return res.status(200).json(cart);
  } catch (err) {
    return next(err);
  };
});

// Update Cart to decrease a product quantity
// Put /api/carts/:id/decrease
router.put("/:id/decrease", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, product } = req.body;
  try {
    let newProducts: {
      quantity: number;
      product: Object;
      productId?: Types.ObjectId | undefined;
    }[] = [];
    const cart = await Cart.findOne({ owner: userId });

    if (cart) newProducts = cart.products;

    for (let cartProduct of newProducts) {
      if (Object(cartProduct.productId).equals(product.productId) && cartProduct.quantity === 1) {
        newProducts.splice(newProducts.indexOf(product.productId), 1);
        await cart?.save();
        return res.status(200).json(cart);
      } else if (Object(cartProduct.productId).equals(product.productId)) {
        cartProduct.quantity -= 1;
        await cart?.save();
        return res.status(200).json(cart);
      }
    };
  } catch (err) {
    return next(err);
  };
});

// Update Cart to remove a product quantity
// Put /api/carts/:id/remove
router.put("/:id/remove", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, productId } = req.body;
  try {
    let newProducts: { quantity: number; productId?: Types.ObjectId | undefined; }[] = [];
    const cart = await Cart.findOne({ owner: userId });

    if (cart) newProducts = cart.products;

    for (let cartProduct of newProducts) {
      if (Object(cartProduct.productId).equals(productId)) {
        newProducts.splice(newProducts.indexOf(cartProduct), 1);
        await cart?.save();
        return res.status(200).json(cart);
      };
    };
  } catch (err) {
    return next(err);
  };
});

export default router;