import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../../lib/connectToDatabse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User";

export default async function handler(req: Request, res: Response) {
  try {
    const mongoClient = await connectToDatabase() as MongoClient;
    const db = mongoClient.db("test");
    const users = db.collection("users");

    const user = await users.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    };
    
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
          return res.status(500).json(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};