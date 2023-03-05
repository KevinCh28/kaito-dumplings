import axios from "axios";

export const getOrders = async (userId: any) => {
  const response = await axios.get(`/api/orders/user/${userId}`);
  return response.data;
};

export const createOrder = async (cartInfo: any) => {
  const response = await axios.post("/api/orders/create", cartInfo);
  return response.data;
}
