import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import User from '@/src/models/User';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { user } = (await getSession(req, res)) as { user: typeof User }
    const baseUrl = `${process.env.MONGO_DATA_API_URL}/users`;
    const readData = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Requested-Headers": "*",
        jwtTokenString: accessToken as string,
      },
      body: JSON.stringify({
        dataSources: process.env.MONGODB_DATA_SOURCE,
        database: "test",
        collection: "users",
      }),
    });
    const readDataJson = await readData.json();
    res.status(200).json(readDataJson);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});