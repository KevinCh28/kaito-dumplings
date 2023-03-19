import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId;
  const { accessToken } = await getAccessToken(req, res);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      jwtTokenString: accessToken as string,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE as string,
    database: "test",
    collection: "carts",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
  
  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const readDataJson = await readData.json();

        if (!readDataJson.document.products) {
          await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              update: {
                $set: {
                  products: [],
                },
              },
            }),
          });
          readDataJson.document = {
            ...readDataJson.document,
            products: [],
          };
        }
        res.status(200).json(readDataJson.document);
        break;
      case "PUT":
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            update: {
              $set: {
                body: req.body.products,
              },
            },
          }),
        });
        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson);
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});