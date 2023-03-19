import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { user } = await getSession(req, res);
    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    switch (req.method) {
      case 'GET':
        const readData = await fetch(`${baseUrl}/findOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            jwtTokenString: accessToken as string,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE as string,
            database: "test",
            collection: "users",
          }),
        });
        const readDataJson = await readData.json();

        if (!readDataJson.document.email) {
          await fetch(`${baseUrl}/updateOne`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              jwtTokenString: accessToken as string,
            },
            body: JSON.stringify({
              dataSource: process.env.MONGODB_DATA_SOURCE,
              database: "test",
              collection: "users",
              filter: { _id: { $oid: readDataJson.document._id } },
              update: {
                $set: {
                  email: user.email,
                  firstname: user.given_name,
                  lastname: user.family_name,
                },
              },
            }),
          });
          readDataJson.document = {
            ...readDataJson.document,
            email: user.email,
            firstname: user.given_name,
            lastname: user.family_name,
          };

          await fetch(`${baseUrl}/updateOne`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              jwtTokenString: accessToken as string,
            },
            body: JSON.stringify({
              dataSource: process.env.MONGODB_DATA_SOURCE,
              database: "test",
              collection: "carts",
              filter: { _id: { $oid: readDataJson.document._id } },
              update: {
                $set: {
                  owner: readDataJson._id,
                  products: [],
                },
              },
            }),
          });
        }

        res.status(200).json(readDataJson.document);
        break;
      case "PUT":
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            jwtTokenString: accessToken as string,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: "test",
            collection: "users",
            filter: { _id: { $oid: req.body._id } },
            update: {
              $set: {
                email: user.email,
                firstname: user.given_name,
                lastname: user.family_name,
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