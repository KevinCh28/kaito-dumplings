import axios from "axios";

export const createCart = async (userId: string) => {
  return await axios.post("/api/carts", { userId });
};