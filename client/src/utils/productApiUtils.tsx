import axios from "axios";
const baseUrl = process.env.NODE_ENV === 'development' ? "" : "https://kaito-five.vercel.app/";

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/products`);
  return response.data;
};

export const getProduct = async (productId: string) => {
  return await axios.get(`${baseUrl}/api/products/${productId}`);
};