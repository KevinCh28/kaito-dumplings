import express from "express";
const router = express.Router();
import passport from "passport";

router.get('/', (req, res) => res.send(200));

export default router;