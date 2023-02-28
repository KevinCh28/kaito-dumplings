import { useRouter } from 'next/router';

const ProductDetail = () => {
    const router = useRouter();
    const productName = router.query.productName;
    
    return (
        <div>{productName}</div>
    );
};

export default ProductDetail;