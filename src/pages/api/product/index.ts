import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.API_KEY as string,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE as string,
    database: "test",
    collection: "products",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
  const productId = req.query.id;

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: productId } },
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson.document);
        break;
      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};