import type { NextPage } from 'next'; 
import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const AccountPage: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [orders, setOrders] = useState([]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // const handleCancel = async (orderNum: string) => {
  //   cancelOrder(user.id, orderNum).then((res) => {
  //     getOrders(user.id).then((res) => {
  //       setOrders(res);
  //     })
  //   })
  // };

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
                {/* {
                  order.orderStatus === 'pending' ?
                  <button className='account_page_buttons' onClick={() => handleCancel(order.orderNumber)}>
                    <i><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></i>
                    Cancel
                  </button> : null
                } */}
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
            <h3 className='account_page_greeting'>Hi {user.given_name}!</h3>
            {/* <button className='account_page_buttons' onClick={handleLogout}>
              Logout
            </button> */}
            <Link className='account_page_buttons' href='/api/auth/logout'>
              Logout
            </Link>
          </div>
          {handleOrderHistory()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

export const getServerSideProps = withPageAuthRequired();