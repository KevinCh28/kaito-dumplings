import axios from "axios";

export const getProducts = async () => {
  const data = await fetch("/api/products");
  const res = await data.json();
  return res;
};

// export const getProduct = async (productId: any) => {
//   const data = await fetch(`/api/products/${productId}`);
//   const res = await data.json();
//   return res;
// };

export const getProduct = async (productName: string) => {
  return await axios.get(`/api/products/${productName}`);
};