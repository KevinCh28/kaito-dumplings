export interface UserJwtPayload {
  jti: string;
  iat: number;
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stripeId: string;
};