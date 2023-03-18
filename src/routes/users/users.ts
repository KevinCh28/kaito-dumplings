import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import validateLoginInput from "../../validation/login";
import validateRegisterInput from "../../validation/register";
import User from "../../../client/src/models/User";
import { Request, Response, NextFunction } from "express";
const config = require('dotenv');
config();

// Private Auth Route for accessing user data on the frontend once logged in
// Get /api/users/current
router.get("/current", async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, process.env.secretOrKey as string) as JwtPayload;

    if (!claims) {
      return res.status(401).send({ err: "Unauthenticated" });
    };

    const user = await User.findOne({ _id: claims._id });
    if (user) {
      const { password, ...data } = user.toJSON();
      res.send(data);
    } else {
      return res.status(401).send({ err: "Unauthenticated" });
    }
  } catch (err) {
    return res.status(401).send({ err: "Unauthenticated" });
  }
});

// Registration Route
// Post /api/users/register
router.post("/register", validateRegisterInput, async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const errors = { email: "Email already exists" };
    return res.status(400).json({ errors });
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
        const userInfo = { _id: user._id };
        const token = jwt.sign(userInfo, process.env.secretOrKey as string);

        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        })
        res.send({ 
          success: true,
          userId: user._id
        });
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
        return res.status(400).json({ errors });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const userInfo = { _id: user._id };
            const token = jwt.sign(userInfo, process.env.secretOrKey as string);

            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
            })
            res.send({ success: true });
          } else {
            return res.status(400).json("Validation Error.");
          }
        });
      });
});

// Logout Route
// Post /api/users/logout
router.post("/logout", (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 })
  res.send({ success: true });
});

export default router;