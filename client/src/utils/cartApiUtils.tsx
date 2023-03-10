import axios from "axios";

export const createCart = async (userId: string) => {
  return await axios.post("/api/carts", { userId });
};

export const getCart = async (userId: string) => {
  return await axios.get(`/api/carts/${userId}`);
};

export const removeItemFromCart = async (userId: string, productId: string) => {
  return await axios.put(`/api/carts/${userId}/remove`, { userId, productId });
};

export const increaseItemQuantity = async (userId: string, product: any, amount: number ) => {
  return await axios.put(`/api/carts/${userId}/increase`, { userId, product, amount });
}

export const decreaseItemQuantity = async (userId: string, product: any) => {
  return await axios.put(`/api/carts/${userId}/decrease`, { userId, product });
}

