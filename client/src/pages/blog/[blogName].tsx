import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductDetail = () => {
    const router = useRouter();
    const { blogName } = router.query;
    // const blogs = {};

    // useEffect(() => {
    //     if (!blogs[blogName]) {
    //         router.push('/blogs');
    //     } else {
    //         return <div>{blogName}</div>
    //     };
    // }, [blogName, router.isReady]);
    return <div>{blogName}</div>
};

export default ProductDetail;