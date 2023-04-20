import { GetStaticProps } from 'next';
import { Product } from '../../types/global';

const getStaticProps: GetStaticProps<{ products: Product[] }> = async () => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.API_KEY as string,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE as string,
    database: "test",
    collection: "products",
  };
  const readData = await fetch(`${process.env.MONGODB_DATA_API_URL}/action/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
    }),
  });
  const readDataJson = await readData.json();
  const products = readDataJson.documents;
  return { props: { products } }
};

export default getStaticProps;