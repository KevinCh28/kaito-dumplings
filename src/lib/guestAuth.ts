import { jwtVerify, SignJWT } from 'jose';
import { UserJwtPayload } from '../../types/global';

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

  const jwtToken = await new SignJWT({ jti: randomString })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  return jwtToken;
}