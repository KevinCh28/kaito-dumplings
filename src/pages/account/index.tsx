import type { NextPage } from 'next'; 
import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { render } from 'react-dom';

const AccountPage: NextPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  // Fetch user's orders
  useEffect(() => {
      (async () => {
        const results = await fetch('/api/orders');
        const data = await results.json();
        setOrders(data)
      })();
  }, [user]);

  // Handle rendering user's orders, if any else display message
  const handleOrderHistory = () => {
    if (orders.length > 0) {
      return (
        <table className='account_page_content_table_wrapper'>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Payment status</th>
              <th>Fulfillment status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: { orderNumber: string, date: string, _id: string, orderStatus: string, total: number, paymentStatus: string }) => {
              let date;
              let newDate;

              if (order.date) {
                date = order.date?.split(' ')
                newDate = date[1] + " " + date[2] + ", " + date[3]
              };

              return (
                <tr className='account_page_order_hover' key={order._id}>
                  <td className='bold'>#{order.orderNumber}</td>
                  <td>{newDate}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.orderStatus}</td>
                  <td>${order.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      return (
        <div>
          <p>You have no orders associated with this email address.</p>
          <p>If you believe this is incorrect, please try another email address or contact our support team for further help.</p>
        </div>
      )
    }
  };

  const handleRender = () => {
    if (user) {
      return (
        <div className='account_page_main'>
          <div className='account_page_orders_header'>
            <div className='account_page_orders_header_wrapper'>
              <h1>Orders ({orders.length})</h1>
            </div>
          </div>

          <div className='account_page_main_wrapper'>
            <div className='account_page_main_container'>
              {handleOrderHistory()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='account_page_main'></div>
      )
    }
  };


  return (
    <div className='account_page_overlay'>
      <div className='account_page_header'>
        <div className='account_page_header_wrapper'>
          <h3 className='account_page_greeting'>
            <Link href='/account'>
              Orders
            </Link>
          </h3>
          <Link className='account_page_buttons' href='/api/auth/logout'>
            Logout
          </Link>
        </div>
      </div>
      {handleRender()}
    </div>
  )
};

export default AccountPage;

export const getServerSideProps = withPageAuthRequired();