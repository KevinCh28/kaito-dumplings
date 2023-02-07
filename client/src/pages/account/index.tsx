import { getOrders } from "../../utils/orderApiUtils";
import { useState, useEffect } from "react";
import Link from 'next/link';

const Account = () => {
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderOrders = () => {
    const orderList = orders.length === 0 ?
      <div>No orders yet
        <div>No orders yet</div>
        <Link href={`/products`}>ORDER NOW</Link>
      </div> :
      orders.map((order) => (
        <div key={order._id}>
          <Link href={`/account/${order.orderNumber}`}>{order.orderNumber}</Link>
          <div>{order.orderStatus}</div>
          <div>{order.total}</div>
        </div>
      ));
    return orderList;
  };

  return (
    <div>
      <div>
        {renderOrders()}
      </div>
    </div>
  );
};