export const getProducts = async () => {
  const data = await fetch("/api/products");
  const res = await data.json();
  return res;
};