import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validateLoginInput from "../../validation/login";
import validateRegisterInput from "../../validation/register";
import validateUserUpdate from "../../validation/users";
import User from "../../database/schemas/User";
const keys = require("../../../config/keys");

// Private auth route for accessing user data on the frontend once logged in
// router.get('/current',
//   passport.authenticate('jwt', {session: false}),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       firstname: req.user.firstname,
//       lastname: req.user.lastname,
//       email: req.user.email
//     });
//   }
// );

router.get('/status', (req, res) => {
  return req.user
    ? res.send(req.user)
    : res.status(401).send({
      msg: 'Unauthorized'
  });
});

//registration route  
router.post("/register", (req, res) => {
  console.log(req.body)
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already registered";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, email: user.email };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//login route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "No account found with this email";
        return res.status(400).json(errors);
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
            errors.password = "Incorrect password";
            return res.status(400).json(errors);
          }
        });
      });
});

  // PATCH route for User
// router.patch('/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateUserUpdate(req.body);
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//     User.findById(req.params.id)
//       .then(user => {
//         user.set(req.body)
//         res.json(user)
//       })
//       .catch(err => res.status(404).json({ noUserFound: "No user found with that ID" }))
//   }
// )

export default router;