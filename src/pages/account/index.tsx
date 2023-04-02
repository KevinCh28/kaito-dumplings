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
        <div className='account_page_orders_container'>
          <h2 className='account_page_orders_header'>YOUR ORDERS</h2>
          {orders.map((order: { orderNumber: string, date: string, _id: string, orderStatus: string, total: number, paymentStatus: string }) => {
            let date;
            let newDate;

            if (order.date) {
              date = order.date?.split(' ')
              newDate = date[1] + " " + date[2] + ", " + date[3]
            };

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
                        <td>#{order.orderNumber}</td>
                        <td>{newDate}</td>
                        <td>{order.paymentStatus}</td>
                        <td>{order.orderStatus}</td>
                        <td>${order.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
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
          <div className='account_page_main_wrapper'>
            <div className='account_page_main_container'>
              <div className='account_page_header'>
                <h3 className='account_page_greeting'>Hi {user.name}!</h3>
                <Link className='account_page_buttons' href='/api/auth/logout'>
                  Logout
                </Link>
              </div>
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
    handleRender()
  )
};

export default AccountPage;

export const getServerSideProps = withPageAuthRequired();