import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProducts } from "@/src/utils/productApiUtils";

const ProductDetail = () => {
  const router = useRouter();
  const productName = router.query.productName
  const products = {
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
    if (!products.productName) {
      console.log('Product not found');
      router.push('/products');
    } else {
      return {productName};
    };
  }, [productName, router.isReady]);
};

export default ProductDetail;