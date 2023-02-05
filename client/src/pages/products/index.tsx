import { getProducts } from "../../utils/productApiUtils";
import { useState, useEffect } from "react";
import Link from 'next/link';

const Products = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderProducts = () => {
    console.log(products)
    const dumplings = products.filter(obj => obj.category === "dumplings");
    const gyoza = products.filter(obj => obj.category === "gyoza");

    return (
      <div>
        <div>
          <h1>Dumplings</h1>
          {dumplings.map((product) => (
            <div key={product._id}>
              <Link href={`/products/${product._id}`}>{product.name}</Link>
              <Link href={`/products/${product._id}`}>{product.imageUrl}</Link>
              <div>{product.description}</div>
              <div>{product.price}</div>
            </div>
          ))}
        </div>
        <div>
          <h1>Gyoza</h1>
          {gyoza.map((product) => (
            <div key={product._id}>
              <Link href={`/products/${product._id}`}>{product.name}</Link>
              <Link href={`/products/${product._id}`}>{product.imageUrl}</Link>
              <div>{product.description}</div>
              <div>{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {renderProducts()}
      </div>
    </div>
  );
};

export default Products;