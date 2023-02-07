const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/', (req, res) => res.send(200));

module.exports = router;