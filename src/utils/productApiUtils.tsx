import axios from "axios";
const baseUrl = "https://kaito-five.vercel.app";

// export const getProducts = async () => {
//   const response = await axios.get(`${baseUrl}/api/products`);
//   return response.data;
// };

export const getProducts = async () => {
  try {
    await fetch('/api/products')
      .then(res => res.json())
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (productId: string) => {
  return await axios.get(`${baseUrl}/api/products/${productId}`);
};