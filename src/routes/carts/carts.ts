const express = require("express");
const router = express.Router();
const User = require("../../database/schemas/User");
const Cart = require("../../database/schemas/Cart");
const Product = require("../../database/schemas/Product");
const validateCartInput = require("../../validation/cart");
import { Request, Response, NextFunction } from "express";

// Get User's cart
// Maybe put it in User's route?

export default router;