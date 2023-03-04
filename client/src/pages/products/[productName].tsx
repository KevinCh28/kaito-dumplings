import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const { productName } = router.query;
  const products = {
    'veggie': true,
    'chicken-&-cabbage': true,
    'beef-&-cheese': true,
    'pork-&-chieves': true
  };

  useEffect(() => {
    if (!products.productName) {
      router.push('/products');
    } else {
      return <div>{productName}</div>
    };
  }, [productName, router.isReady]);
};

export default ProductDetail;