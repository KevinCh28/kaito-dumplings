import express from "express";
const router = express.Router();
const validateProductInput = require("../../validation/product");
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
// POST /api/products

// Update a product
// PUT /api/products/:id

// Delete a product
// DELETE /api/products/:id

export default router;