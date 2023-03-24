import type { NextApiRequest, NextApiResponse } from 'next'
import { verfiyGuest } from '../../../lib/guestAuth';

export default (async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    collection: "guests",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
  const cookie = req.cookies.guest as string;
  const verifiedToken = await verfiyGuest(cookie);
  const guestId = verifiedToken?.jti as string;

  try {
    switch (req.method) {
      case 'GET':
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: guestId },
          }),
        });
        const readDataJson = await readData.json();

        if (!readDataJson.document) {
          await fetch(`${baseUrl}/insertOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              document: {
                _id: guestId,
                products: [],
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            }),
          });
          readDataJson.document = {
            _id: guestId,
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
            filter: { _id: guestId },
          }),
        });
        const updateDataJson = await updateData.json();

        if (updateDataJson.document.products.length < 1) {
          await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: updateDataJson.document._id },
              update: {
                $set: {
                  products: [{ product: data.product, quantity: data.quantity }],
                  updatedAt: new Date(),
                },
              },
            }),
          });

          updateDataJson.document = {
            ...updateDataJson.document,
            products: [{ product: data.product, quantity: data.quantity }],
          };
          console.log(updateDataJson);
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
              updatedAt: new Date(),
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
            filter: { _id: updateDataJson.document._id },
            update: {
              $set: {
                products: filteredProducts,
                updatedAt: new Date(),
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
            filter: { _id: guestId },
          }),
        });
        const deleteDataJson = await deleteData.json();
        console.log(deleteDataJson)

        if (deleteDataJson.document.products.length > 0) {
          await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: deleteDataJson.document._id },
              update: {
                $set: {
                  products: [],
                },
              },
            }),
          });
        } else {
          res.status(200).json({ message: "No products in cart" });
        }
        res.status(200).json({ message: "Cart cleared" });
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});