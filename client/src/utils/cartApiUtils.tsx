import axios from "axios";

export const createCart = async (userId: string) => {
  return await axios.post("/api/carts", { userId });
};

export const getCart = async (userId: string) => {
  return await axios.get(`/api/carts/${userId}`);
};