import express from "express";
const router = express.Router();
import authRouter from "./auth/index.js";
import productRouter from "./products/index.js";
import cartRouter from "./carts/index.js";

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);

export default router;