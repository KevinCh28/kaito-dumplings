import { getAccessToken } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Requested-Headers": "*",
      jwtTokenString: accessToken as string,
    },
  };
  const fetchBody = {
    dataSources: process.env.MONGODB_DATA_SOURCE,
    database: "test",
    collection: "carts",
  };

  let baseUrl: string = '';
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = `${process.env.MONGODB_DATA_API_URL}`;
  };

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/api/carts`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            sort: { createdAt: -1 },
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson);
        break;
      case "POST":
        const updateData = await fetch(`${baseUrl}/api/carts`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $old: req.body._id } },
            update: {
              $set: {
                product: [],
              },
            },
          }),
        });
        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson);
        break;
      default:
        res.status(400).json({ message: "Invalid request method" });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  };
};