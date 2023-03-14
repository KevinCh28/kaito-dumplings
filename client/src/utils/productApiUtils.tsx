import axios from "axios";
const baseUrl = "https://kaito-five.vercel.app/";

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/products`);
  return response.data;
};

// Get products based user's cart
export const getProductsByIds = async (cart: object) => {
  const promises = cart.products.map(async (product: object) => {
    const { data } = await axios.get(`${baseUrl}/api/products/${product.productId}`);
    const cart = {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity: product.quantity,
    }
    return cart;
  });
  return await Promise.all(promises);
};

export const getProduct = async (productId: string) => {
  return await axios.get(`${baseUrl}/api/products/${productId}`);
};