import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

const flavors: { [key: string]: string } = useMemo(() => {
  return {
    'beef-&-cheese': '63efa8319010d97ce1747153',
    'chicken-&-cabbage': '63efa8b49010d97ce1747155',
    'pork-&-chieves': '63efa8d19010d97ce1747157',
    'veggie': '63efa9259010d97ce174715f',
  };
}, []);

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const productName = (router.query.productName as string);

  useEffect(() => {
    { productName };
  }, [productName, router.isReady]);
};

export default ProductDetail;

export async function getStaticProps({ params }) {
  let dumplingId = flavors[params.productName];
  const res = await fetch(`/api/product?id=${dumplingId}`)
  const product = await res.json()
  return { props: { product } }
}