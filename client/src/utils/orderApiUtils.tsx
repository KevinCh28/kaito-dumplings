import axios from "axios";

export const getOrders = async (userId: any) => {
  const response = await axios.get(`/api/orders/user/${userId}`);
  return response.data;
};

export const getOrder = async (orderNumber: any) => {
  const data = await fetch(`/api/user/userId/${orderNumber}`);
  const res = await data.json();
  return res;
};
