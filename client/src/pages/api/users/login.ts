// import type { NextApiRequest, NextApiResponse } from 'next'
// import { MongoClient } from "mongodb";
// import { connectToDatabase } from "../../../../lib/connectToDatabse";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const mongoClient = await connectToDatabase() as MongoClient;
//     const db = mongoClient.db("test");
//     const users = db.collection("users");
//     const email = req.body.email;
//     const password = req.body.password;

//     await users.findOne({ email })
//       .then(user => {
//         if (!user) {
//           const errors = { email: "No account found with this email" };
//           return res.status(400).json({ errors });
//         }

//         bcrypt.compare(password, user.password)
//           .then(isMatch => {
//             console.log(isMatch)
//             if (isMatch) {
//               const userInfo = { _id: user._id };
//               const token = jwt.sign(userInfo, process.env.secretOrKey as string);
//               const options = {
//                 httpOnly: true,
//                 maxAge: 1000 * 60 * 60 * 24 * 30
//               };

//               // res.setHeader('Set-Cookie', 'jwt=' + token);
//               res.setHeader('Set-Cookie',
//                 [
//                   cookie
//                 ]
//               );

//               res.send({ success: true });

//               res.send({ success: true });
//             } else {
//               return res.status(400).json("Validation Error.");
//             }
//           });
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

import User from '@/src/models/User';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { accessToken } = await getAccessToken(req, res);
//     const { user } = (await getSession(req, res)) as { user: typeof User }
//     const baseUrl = `${process.env.MONGO_DATA_API_URL}/users/login`;
//     const readData = await fetch(baseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Requested-Headers": "*",
//         jwtTokenString: accessToken as string,
//       },
//       body: JSON.stringify({
//         dataSources: process.env.MONGODB_DATA_SOURCE,
//         database: "test",
//         collection: "users",
//       }),
//     });
//     const readDataJson = await readData.json();
//     res.status(200).json(readDataJson);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

import { getSession, getAccessToken, setSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { email, password } = req.body;
//   // const baseUrl = `${process.env.MONGO_DATA_API_URL}/users/login`;
//   const baseUrl = `${process.env.AUTH0_BASE_URL}/users/login`;
//   console.log(email)
//   console.log(password)

//   const user = (await getSession(req.body, res));
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });

//   const accessToken = getAccessToken(user, req, res);
//   return res.status(200).json({ accessToken });
// };

import Auth0 from '../auth/[...auth0]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end({ error });
  }
};