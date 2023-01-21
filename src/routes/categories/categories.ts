import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from "express";
import Category from "../../database/schemas/Category";

// Get all categories
// GET /api/categories
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    return next([]);
  }
});

// Get a single category
// GET /api/categories/:categoryName
router.get("/:categoryName", async (req: Request, res: Response, next: NextFunction) => {
  let category;

  try {
    category = await Category.findById(req.params.categoryName);
    return res.json(category);
  } catch (err) {
    return res.status(404).json("Category not found");
  }
});

export default router;