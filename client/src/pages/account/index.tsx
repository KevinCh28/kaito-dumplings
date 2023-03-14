import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCurrentUser, logout } from '@/src/utils/sessionApiUtils';
import { getOrders, cancelOrder } from '@/src/utils/orderApiUtils';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const AccountPage: NextPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ id: '', firstname: '' });

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        const element = window.document.getElementsByClassName('navbar_main')[0] as HTMLDivElement;
        element.style.backgroundColor = 'rgb(246, 22, 31)';
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
        console.log(orders)
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [user]);

  const handleLogout = async () => {
    await logout()
      .then((res) => {
        window.location.reload();
      })
  };

  const handleCancel = async (orderNum: string) => {
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
        <div className='account_page_orders_container'>
          <h2 className='account_page_orders_header'>YOUR ORDERS</h2>
          {orders.map((order: { orderNumber: string, date: string, _id: string, orderStatus: string, total: number }) => {
            const date = order.date.split(' ')
            const newDate = date[1] + " " + date[2] + ", " + date[3]

            return (
              <div className='account_page_order' key={order._id}>
                <div className='account_page_order_info'>
                  <table>
                    <thead>
                      <tr>
                        <td>Order</td>
                        <td>Date</td>
                        <td>Payment status</td>
                        <td>Fulfillment status</td>
                        <td>Total</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order.orderNumber}</td>
                        <td>{newDate}</td>
                        <td></td>
                        <td>{order.orderStatus.toUpperCase()}</td>
                        <td>${(order.total).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {
                  order.orderStatus === 'pending' ?
                  <button className='account_page_buttons' onClick={() => handleCancel(order.orderNumber)}>
                    <i><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></i>
                    Cancel
                  </button> : null
                }
              </div>
            )
          })}
        </div>
  )};

  return (
    <div className='account_page_main'>
      <div className='account_page_main_wrapper'>
        <div className='account_page_main_container'>
          <div className='account_page_header'>
            <h3 className='account_page_greeting'>Hi {user.firstname}!</h3>
            <button className='account_page_buttons' onClick={handleLogout}>
              Logout
            </button>
          </div>
          {handleOrderHistory()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;