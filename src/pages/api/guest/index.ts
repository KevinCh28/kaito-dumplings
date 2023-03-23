import type { NextApiRequest, NextApiResponse } from 'next'

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
  const guestId = req.query.id;


  try {
    switch (req.method) {
      case 'GET':
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            filter: { _id: { $oid: guestId } },
          }),
        });
        const readDataJson = await readData.json();

        if (!readDataJson.document.id) {
          await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              dataSource: process.env.MONGODB_DATA_SOURCE,
              database: "test",
              collection: "guests",
              filter: { _id: { $oid: readDataJson.document.id } },
              update: {
                $set: {
                  cart: {
                    products: [],
                  }
                },
              },
            }),
          });
          readDataJson.document = {
            ...readDataJson.document,
            cart: {
              products: [],
            }
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
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});