import axios from "axios";

export const createCart = async (userId: string) => {
  return await axios.post("/api/carts", { userId });
};

export const getCart = async (userId: string) => {
  return await axios.get(`/api/carts/${userId}`);
};

export const removeItemFromCart = async (userId: string, productId: string) => {
  return await axios.delete(`/api/carts/${userId}/${productId}`);
};

export const increaseItemQuantity = async (userId: string, productId: string) => {
  return await axios.put(`/api/carts/${userId}/increase`, { userId, productId });
}

export const lowerItemQuantity = async (userId: string, productId: string) => {
  return await axios.put(`/api/carts/${userId}/lower`, { productId });
}

