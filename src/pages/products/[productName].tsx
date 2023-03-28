import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const productName = (router.query.productName as string);

  useEffect(() => {
    { productName };
  }, [productName, router.isReady]);
};

export default ProductDetail;