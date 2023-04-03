import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Stripe from 'stripe';
const stripeKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

const OrderSuccessPage: NextPage = ({ checkoutSession }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser();
  const [order, setOrder] = useState({
    orderNumber: '',
    tax: 0,
    shipping: 0,
    subtotal: 0,
    total: 0,
    customer: {
      name: '',
      email: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
      },
    },
    shippingAddress: {
      name: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
      },
    },
  });

  // reset cart to empty
  useEffect(() => {
    if (!user && checkoutSession.payment_status === 'paid') {
      (async () => {
        await fetch('/api/guests', {
          method: 'DELETE',
        });
      })();
    } else if (user && checkoutSession.payment_status === 'paid') {
      (async () => {
        await fetch('/api/carts', {
          method: 'DELETE',
        });
      })();
    }
  }, [user]);

  // create order on successful payment
  useEffect(() => {
    if (order.orderNumber === '') {
      (async () => {
        const results = await fetch('/api/orders', {
          method: 'PUT',
          body: JSON.stringify({
            stripePaymentIntentId: checkoutSession.payment_intent.id,
            customer: checkoutSession.customer_details,
            shippingAddress: checkoutSession.shipping_details,
            products: checkoutSession,
            subtotal: (checkoutSession.amount_subtotal / 100).toFixed(2),
            shipping: (checkoutSession.total_details.amount_shipping / 100).toFixed(2),
            total: (checkoutSession.amount_total / 100).toFixed(2),
            currency: checkoutSession.currency.toUpperCase(),
            discount: (checkoutSession.total_details.amount_discount / 100).toFixed(2),
            tax: (checkoutSession.total_details.amount_tax / 100).toFixed(2),
            orderStatus: 'PENDING',
            paymentStatus: checkoutSession.payment_status.toUpperCase(),
            date: new Date().toString(),
          })
        });
        const data = await results.json();
        setOrder(data);
      })();
    }
  }, [checkoutSession]);

  return (
    <div className='order_success_page'>
      <div className='order_success_page_container'>
        <div>
          <p>YOUR ORDER HAS BEEN RECEIVED.</p>
          <h1>Thank you for your purchase!</h1>
          <p>We appreciate your order, we&apos;re currently processing it. So hang tight and we&apos;ll send you confirmation very soon!</p>
        </div>
        <div>
          <p>Your order # is: {order.orderNumber}</p>
          <p></p>
        </div>

        <div className='success_page_body'>
          <div className='success_page_body_content'>
            <div className='success_page_address_info'>
              <div>
                <p>Billing Information:</p>
              </div>
              <p>
                {order.customer.name}
                <br />
                {order.customer.address.line1}
                <br />
                {order.customer.address.line2?.length > 0 ? order.customer.address.line2 : null}
                {order.customer.address.line2?.length > 0 ? <br /> : null}
                {order.customer.address.city}, {order.customer.address.state} {order.customer.address.postal_code}
              </p>
            </div>

            <div className='success_page_address_info'>
              <div>
                <p>Shipping Information:</p>
              </div>
              <p>
                {order.shippingAddress?.name}
                <br />
                {order.shippingAddress?.address?.line1}
                <br />
                {order.shippingAddress?.address?.line2?.length > 0 ? order.shippingAddress?.address.line2 : null}
                {order.shippingAddress?.address?.line2?.length > 0 ? <br /> : null}
                {order.shippingAddress?.address?.city}, {order.shippingAddress?.address?.state} {order.shippingAddress?.address?.postal_code}
              </p>
            </div>
          </div>

          <div className='success_page_body_content'>
            <div className='success_page_order_info_wrapper'>
              <div className='success_page_order_info_container'>
                <div className='success_page_order_info'>
                  <p>Subtotal:</p>
                  <p>${(order.subtotal * 1.00).toFixed(2)}</p>
                </div>
                <div className='success_page_order_info'>
                  <p>Shipping:</p>
                  <p>${(order.shipping * 1.00).toFixed(2)}</p>
                </div>
                <div className='success_page_order_info'>
                  <p>Tax:</p>
                  <p>${(order.tax * 1.00).toFixed(2)}</p>
                </div>
                <div className='success_page_order_info'>
                  <p>Total:</p>
                  <p>${(order.total * 1.00).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
        <div className='account_page_continue_shopping_wrapper'>
          <div className='cart_action_buttons_container'>
            <div className='cart_continue_shopping_button'>
              <Link href='/products'>Continue Shopping</Link>
            </div>
          </div>
        </div>
    </div>
  )
};

export default OrderSuccessPage;

// Fetch the Stripe's Checkout Session and pass it as props to the page before page renders
export const getServerSideProps: GetServerSideProps = async (context) => {
  const success_id = context.query.success_id as string;
  if (!success_id.startsWith('cs_')) {
    throw new Error('Invalid Checkout Session ID');
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(success_id, {
    expand: ['payment_intent', 'line_items.data.price.product'],
  });

  return { 
    props: { 
      checkoutSession,
    },
  };
};