import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductDetail = () => {
    const router = useRouter();
    const { productName } = router.query;
    const products = {
            'veggie': 'Veggie (Vegan) (50pc)',
            'chicken-&-cabbage': 'Chicken & Cabbage (50pc)',
            'beef-&-cheese': 'Beef & Cheese (50pc)',
            'pork-&-chieves': 'Pork & Chieves (50pc)'
        };

    useEffect(() => {
        if (!products[productName]) {
            router.push('/products');
        } else {
            return <div>{productName}</div>
        };
    }, [productName, router.isReady]);
};

export default ProductDetail;