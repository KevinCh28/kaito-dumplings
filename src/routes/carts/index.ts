import express from "express";
const router = express.Router();
import passport from "passport";
import isAuthenticated from "../../utils/middlewares.js";

router.get('/', isAuthenticated, (req, res) => res.send(200));

export default router;