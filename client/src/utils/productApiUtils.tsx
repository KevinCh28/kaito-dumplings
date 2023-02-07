import axios from "axios";

export const getUserCart = async () => {
  const res = await axios.get(`/api/products`);
  return res.data;
};