import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const OrderSuccessPage: NextPage = () => {
  const { query } = useRouter();
  const sessionId = query.success_id;
  const URL = `/api/stripe/sessions/${sessionId}`
  const { user, error, isLoading } = useUser();
  const [checkoutSession, setCheckoutSession] = useState({
    customer_details: {
      email: '',
      name: ''
    },
    currency: '',
    payment_intent: {
      charges: {
        data: [
          {
            payment_method_details: {
              card: {
                brand: '',
                last4: ''
              }
            }
          }
        ]
      }
    },
    amount_subtotal: 0,
    amount_total: 0,
    total_details: {
      amount_discount: 0,
      amount_tax: 0,
      amount_shipping: 0
    },
    line_items: {
      data: [
        {
          price: {
            product: {
              name: '',
              description: '',
              images: ['']
            },
            unit_amount: 0
          },
          quantity: 0
        }
      ]
    }
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data)
      setCheckoutSession(data);
    })();
  }, [sessionId]);

  const customer = checkoutSession?.customer_details;
  const products = checkoutSession?.line_items?.data?.map((item: { price: { product: object; unit_amount: number; }; quantity: number; }) => ({
    ...item.price.product,
    price: item.price.unit_amount,
    quantity: item.quantity
  }));
  const payment = checkoutSession?.payment_intent?.charges?.data[0]?.payment_method_details?.card;
  const subtotal = checkoutSession?.amount_subtotal;
  const shipping = checkoutSession?.total_details?.amount_shipping;
  const total = checkoutSession?.amount_total;
  const currency = checkoutSession?.currency;
  const discount = checkoutSession?.total_details?.amount_discount;
  const tax = checkoutSession?.total_details?.amount_tax;

  // reset cart
  useEffect(() => {
    if (user) {
      (async () => {
        await fetch('/api/cart', {
          method: 'DELETE',
        });
      })();
    } else {
      (async () => {
        await fetch('/api/guest', {
          method: 'DELE',
        });
      })();
    }
  }, []);

  return (
    <div>
      <div>
        <p>Payment successful</p>
        <h1>Thanks for ordering</h1>
        <p>We appreciate your order, we're currently processing it. So hang tight and we'll send you confirmation very soon!</p>
      </div>
      <div>
        <p>Order #{sessionId}</p>
        <p></p>
      </div>

      <div></div>

      <div>
        <div>
          <p>Subtotal</p>
          <p>${(subtotal / 100).toFixed(2)}</p>
        </div>
        <div>
          <p>Shipping</p>
          <p>${(shipping / 100).toFixed(2)}</p>
        </div>
        <div>
          <p>Total</p>
          <p>${(total / 100).toFixed(2)} {currency?.toUpperCase()}</p>
        </div>
      </div>

      <div>
        <div>
          <div>
            <p>Billing address</p>
          </div>
          <p>
            {customer?.name}
            <br />
            {customer?.line1}
            <br />
            {customer?.line2}
            <br />
            {customer?.city}, {customer?.state} {customer?.postal_code}
            <br />
            {customer?.country}
          </p>
        </div>
        <div>
          <div>
            <p>Shipping address</p>
          </div>
          <p>
            {customer?.name}
            <br />
            {customer?.line1}
            <br />
            {customer?.line2}
            <br />
            {customer?.city}, {customer?.state} {customer?.postal_code}
            <br />
            {customer?.country}
          </p>
        </div>
      </div>
    </div>
  )
};

export default OrderSuccessPage;