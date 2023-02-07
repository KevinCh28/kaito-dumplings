import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

router.get('/status', (req, res) => {
  return req.user
    ? res.send(req.user)
    : res.status(401).send({
      msg: 'Unauthorized'
  });
});

export default router;