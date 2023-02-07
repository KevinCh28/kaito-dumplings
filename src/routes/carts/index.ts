import express from "express";
const router = express.Router();
import passport from "passport";
import isAuthenticated from "../../utils/middlewares";
import { getCartController } from "../../controllers/cart"

router.get('/', isAuthenticated, getCartController);

export default router;