export const getOrders = async (userId: any) => {
  const data = await fetch(`/api/user/${userId}`);
  const res = await data.json();
  return res;
};

export const getOrder = async (orderNumber: any) => {
  const data = await fetch(`/api/user/userId/${orderNumber}`);
  const res = await data.json();
  return res;
};
