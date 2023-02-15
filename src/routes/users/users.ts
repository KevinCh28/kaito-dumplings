import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validateLoginInput from "../../validation/login";
import validateRegisterInput from "../../validation/register";
import User from "../../database/schemas/User";
const keys = require("../../../config/keys");
const { loginUser, restoreUser } = require("../../../config/passport");
import { Request, Response, NextFunction } from "express";

// Private auth route for accessing user data on the frontend once logged in
// router.get("/current",
//   passport.authenticate('jwt', {session: false}),
//   (req: Request, res: Response) => {
//     res.json({
//       id: req.user.id,
//       firstname: req.user.firstname,
//       lastname: req.user.lastname,
//       email: req.user.email
//     });
//   }
// );

// Registration Route
// Post /api/users/register
router.post("/register", validateRegisterInput, async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const errors = { email: "Email already exists" };
    const err = Error("Validation Error.");
    (err as any).errors = errors;
    (err as any).statusCode = 400;
    (err as any).title = "Validation Error.";
    return res.status(400).json({ err });
  }

  const newUser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.password = hashedPassword;
        const user = await newUser.save();
        return res.json(loginUser(user));
      } catch (err) {
        return next(err);
      }
    });
    });
  }
);

// Login Route
// Post /api/users/login
router.post("/login", validateLoginInput, async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        const errors = { email: "No account found with this email" };
        const err = Error("Validation Error.");
        (err as any).errors = errors;
        (err as any).statusCode = 400;
        (err as any).title = "Validation Error.";
        return res.status(400).json({ err });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, email: user.email };

            // the user(the payload) is encoded into the jwt. The frontend will decode it
            // to get the user object upon page refresh
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user
              });
            });
          } else {
            const errors = { password: "Incorrect password" };
            const err = Error("Validation Error.");
            (err as any).errors = errors;
            (err as any).statusCode = 400;
            (err as any).title = "Validation Error.";
            return res.status(400).json({ err });
          }
        });
      });
});

export default router;