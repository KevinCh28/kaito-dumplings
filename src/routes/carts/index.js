const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../../utils/middlewares.js");

router.get('/', isAuthenticated, (req, res) => res.send(200));

module.exports = router;