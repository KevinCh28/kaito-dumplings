import axios from "axios";

export const getOrders = async (userId: any) => {
  const response = await axios.get(`/api/orders/user/${userId}`);
  return response.data;
};

export const createOrder = async (cartInfo: any) => {
  const response = await axios.post("/api/orders/create", cartInfo);
  return response.data;
}

// export const cancelOrder = async (userId: any, orderNumber: any) => {
//   const response = await axios.put(`/api/orders/user/${userId}/${orderNumber}`, { userId, orderNumber });
//   return response.data;
// }

export const cancelOrder = async (userId: any, orderNumber: any) => {
  console.log(userId)
  console.log(orderNumber)
  return await axios.put(`/api/orders/user/${userId}/${orderNumber}`, { userId, orderNumber });
}