import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const productName = (router.query.productName as string);
  const products: { [key: string]: boolean } = {
    'dumplings-veggie': true,
    'dumplings-chicken-&-cabbage': true,
    'dumplings-beef-&-cheese': true,
    'dumplings-pork-&-chieves': true,
    'gyoza-veggie': true,
    'gyoza-chicken-&-cabbage': true,
    'gyoza-beef-&-cheese': true,
    'gyoza-pork-&-chieves': true
  };

  useEffect(() => {
    if (!products[productName]) {
      router.push('/products');
    } else {
      { productName };
    };
  }, [productName, products, router]);
};

export default ProductDetail;