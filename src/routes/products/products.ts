import express from "express";
const router = express.Router();
import validateProductInput from "../../validation/products";
import { Request, Response, NextFunction } from "express";
import Product from "../../database/schemas/Product";

// Get all products
// GET /api/products
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return next([]);
  }
});

// Get a single product
// GET /api/products/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  let product;

  try {
    product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    return res.status(404).json("Product not found");
  }
});

// Create a new product
// POST /api/products/create
router.post("/create", validateProductInput, async (req: Request, res: Response, next: NextFunction) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
  });

  try {
    const product = await newProduct.save();
    return res.json(product);
  } catch (err) {
    return next(err);
  };
});

// Update a product
// PUT /api/products/:id

// Delete a product
// DELETE /api/products/:id

export default router;