import express from "express";
const router = express.Router();
import authRouter from "./users/users";
import productRouter from "./products/products";
import cartRouter from "./carts/index";

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);

export default router;