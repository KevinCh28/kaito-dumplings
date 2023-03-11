import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProducts } from "@/src/utils/productApiUtils";

const ProductDetail = () => {
  const router = useRouter();
  const productName = router.query.productName
  const products = {
    'veggie': true,
    'chicken-&-cabbage': true,
    'beef-&-cheese': true,
    'pork-&-chieves': true
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