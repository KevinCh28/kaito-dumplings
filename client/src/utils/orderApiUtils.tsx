import axios from "axios";
const baseUrl = "https://kaito-five.vercel.app/";

export const getOrders = async (userId: string) => {
  const response = await axios.get(`${baseUrl}/api/orders/user/${userId}`);
  return response.data;
};

export const createOrder = async (cartInfo: object) => {
  const response = await axios.post(`${baseUrl}/api/orders/create`, cartInfo);
  return response.data;
}

export const cancelOrder = async (userId: string, orderNumber: string) => {
  console.log(userId)
  console.log(orderNumber)
  return await axios.put(`${baseUrl}/api/orders/user/${userId}/${orderNumber}`, { userId, orderNumber });
}