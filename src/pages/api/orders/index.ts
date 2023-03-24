import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    collection: "orders",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson.documents);
        break;
      case "PUT":
        let randomNum = "K" + Math.floor(Math.random() * 1000000);
        const createBody = JSON.parse(req.body);
        const createData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: {
              stripePaymentIntentId: createBody.stripePaymentIntentId,
              orderNum: randomNum,
            },
          }),
        });
        const createDataJson = await createData.json();

        while (createDataJson.document.orderNum === randomNum) {
          randomNum = "K" + Math.floor(Math.random() * 1000000);
        };
        
        if (!createDataJson.document.stripePaymentIntentId && !createDataJson.document.orderNum) {
          await fetch(`${baseUrl}/insertOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              document: {
                orderNum: randomNum,
                ...createBody,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            }),
          });
        }

        res.status(200).json(createDataJson.document);
        break;
      case "DELETE":
        const data = JSON.parse(req.body);
        const updateData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { orderNum: data.orderNum },
            update: {
              $set: {
                status: "canceled",
              },
            },
          }),
        });
        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson.document);
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