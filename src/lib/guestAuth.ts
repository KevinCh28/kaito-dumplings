import { jwtVerify, SignJWT } from 'jose';

interface UserJwtPayload {
  jti: string;
  iat: number;
};

export const getJwtSecretKey = () => {
  const secret = process.env.secretOrKey as string;
  if (!secret || secret.length === 0) {
    throw new Error('The environment variable secretOrKey is not set.');
  }
  return secret;
};

export const verfiyGuest = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    return verified.payload as UserJwtPayload;
  } catch (err) {
    console.log(err);
  }
};

export const createGuestToken = async () => {
  let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const readData = await fetch(`${process.env.MONGODB_DATA_API_URL}/action/findOne`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.API_KEY as string,
    },
    body: JSON.stringify({
      dataSource: process.env.MONGODB_DATA_SOURCE as string,
      database: "test",
      collection: "guests",
      filter: { _id: randomString },
    }),
  });
  const readDataJson = await readData.json();

  while (readDataJson._id) {
    randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const jwtToken = await new SignJWT({ jti: randomString })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  return jwtToken;
}