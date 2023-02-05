const Router = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = Router();

// const validateRegisterInput = require('../validation/register.js');
// const validateLoginInput = require('../validation/login.js');
// const validateUserUpdate = require('../validation/users.js');

// Private auth route for accessing user data on the frontend once logged in
router.get('/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email
    });
  }
);

module.exports = router;