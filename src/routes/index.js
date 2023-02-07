const express = require("express");
const router = express.Router();
const authRouter = require("./auth/index.js");
const productRouter = require("./products/index.js");
const cartRouter = require("./carts/index.js");

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);

module.exports = router;