import { Request, Response } from "express";
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../../lib/connectToDatabse";
import { getSession, getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mongoClient = await connectToDatabase() as MongoClient;
    const db = mongoClient.db("test");
    const users = db.collection("users");
    const email = req.body.email;
    const password = req.body.password;

    await users.findOne({ email })
      .then(user => {
        if (!user) {
          const errors = { email: "No account found with this email" };
          return res.status(400).json({ errors });
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            console.log(isMatch)
            if (isMatch) {
              const userInfo = { _id: user._id };
              const token = jwt.sign(userInfo, process.env.secretOrKey as string);
              const options = {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30
              };

              // res.setHeader('Set-Cookie', 'jwt=' + token);
              res.setHeader('Set-Cookie',
                [
                  cookie
                ]
              );

              res.send({ success: true });

              res.send({ success: true });
            } else {
              return res.status(400).json("Validation Error.");
            }
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};