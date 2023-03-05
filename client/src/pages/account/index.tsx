import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCurrentUser, logout } from '@/src/utils/sessionApiUtils';
import { getOrders, cancelOrder } from '@/src/utils/orderApiUtils';
import { useRouter } from 'next/router';

const AccountPage: NextPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ id: '', firstname: '' });

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser({
          id: res._id,
          firstname: res.firstname
        });
      })
      .catch((err) => {
        router.push('/login');
      }
    );
  }, []);

  useEffect(() => {
    getOrders(user.id)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [user]);

  const handleLogout = async () => {
    await logout()
      .then((res) => {
        router.push('/');
      })
  };

  const handleCancel = async (orderNum: any) => {
    cancelOrder(user.id, orderNum).then((res) => {
      getOrders(user.id).then((res) => {
        setOrders(res);
      })
    })
  };

  const handleOrderHistory = () => {
    if (orders.length === 0) {
      return (
        <div>
          <p>You have no orders associated with this email address.</p>
          <p>If you believe this is incorrect, please try another email address or contact our support team for further help.</p>
        </div>
      )};
      return (
        <div>
          <h2>YOUR ORDERS:</h2>
          {orders.map((order: any) => {
            const date = order.date.split(' ')
            const newDate = date[1] + " " + date[2] + ", " + date[3]

            return (
              <div key={order._id}>
                <div>
                  <p>Order Number: {order.orderNumber}</p>
                  <p>Order Date: {newDate}</p>
                  <p>Order Total: ${order.total}</p>
                  <p>Order Status: {order.orderStatus.toUpperCase()}</p>
                </div>
                {order.orderStatus === 'pending' ? <button onClick={() => handleCancel(order.orderNumber)}>cancel</button> : null}
              </div>
            )
          })}
        </div>
  )};

  return (
    <div className='account_page_container'>
      <div className='account_orders_container'>
        <h3>HI {user.firstname}!</h3>
        {handleOrderHistory()}
      </div>
      <div className='account_logout_button_container'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;