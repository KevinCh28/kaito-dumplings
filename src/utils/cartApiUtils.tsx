import axios from "axios";
const baseUrl = "https://kaito-five.vercel.app";

export const createCart = async (userId: string) => {
  return await axios.post(`${baseUrl}/api/carts`, { userId });
};

export const getCart = async (userId: string) => {
  return await axios.get(`${baseUrl}/api/carts/${userId}`);
};

export const removeItemFromCart = async (userId: string, productId: string) => {
  return await axios.put(`${baseUrl}/api/carts/${userId}/remove`, { userId, productId });
};

export const increaseItemQuantity = async (userId: string, product: object, amount: number ) => {
  return await axios.put(`${baseUrl}/api/carts/${userId}/increase`, { userId, product, amount });
}

export const decreaseItemQuantity = async (userId: string, product: object) => {
  return await axios.put(`${baseUrl}/api/carts/${userId}/decrease`, { userId, product });
}

