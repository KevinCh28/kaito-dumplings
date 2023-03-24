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
              filter: { _id: { $oid: readDataJson.document._id } },
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
        const data = JSON.parse(req.body);
        const updateData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const updateDataJson = await updateData.json();

        if (updateDataJson.document.products.length < 1) {
          await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: updateDataJson.document._id } },
              update: {
                $set: {
                  products: [{ product: data.product, quantity: data.quantity }],
                },
              },
            }),
          });

          updateDataJson.document = {
            ...updateDataJson.document,
            products: [{ product: data.product, quantity: data.quantity }],
          };
          res.status(200).json(updateDataJson.document);
          break;
        }

        let foundProduct = false;
        const updatedProducts = updateDataJson.document.products.map((item: { product: { _id: string; }; quantity: number; }) => {
          if (item.product._id === data.product._id) {
            const newQuantity = item.quantity + data.quantity;
            foundProduct = true;
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });

        if (!foundProduct) {
          updatedProducts.push({
            product: data.product,
            quantity: data.quantity
          });
        }

        const filteredProducts = updatedProducts.filter(
          (item: { quantity: number; }) => item.quantity > 0
        );

        const updatedCart = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: updateDataJson.document._id } },
            update: {
              $set: {
                products: filteredProducts,
              },
            },
          }),
        });
        res.status(200).json({ filteredProducts });
        break;
      case "DELETE":
        const deleteData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const deleteDataJson = await deleteData.json();

        await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: deleteDataJson.document._id } },
            update: {
              $set: {
                products: [],
              },
            },
          }),
        });
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});