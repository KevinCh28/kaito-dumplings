const express = require('express');
const router = express.Router();
import { Request, Response } from "express";

if (process.env.NODE_ENV !== 'production') {
  router.get("/restore", (req: Request, res: Response) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({ "CSRF-Token": csrfToken });
  });
};

export default router;