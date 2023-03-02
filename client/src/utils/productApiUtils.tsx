import axios from "axios";

export const getProducts = async () => {
  const data = await fetch("/api/products");
  const res = await data.json();
  return res;
};

// Get products based user's cart
export const getProductsByIds = async (cart: any) => {
  const promises = cart.products.map(async (product: any) => {
    const { data } = await axios.get(`/api/products/${product.productId}`);
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

export const getProduct = async (productName: string) => {
  return await axios.get(`/api/products/${productName}`);
};