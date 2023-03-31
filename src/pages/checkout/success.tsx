import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const OrderSuccessPage: NextPage = () => {
  const { query } = useRouter();
  const sessionId = query.success_id;
  const URL = `/api/stripe/sessions/${sessionId}`
  const { user } = useUser();
  const [checkoutSession, setCheckoutSession] = useState({
    customer_details: {
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
    currency: '',
    payment_status: '',
    payment_intent: {
      id: '',
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
    },
    shipping_details: {
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
  });

  // fetch checkout session data
  useEffect(() => {
    (async () => {
      const response = await fetch(URL);
      const data = await response.json();
      console.log("checkout session data: ")
      console.log(data)
      setCheckoutSession(data);
    })();
  }, [URL]);

  // reset cart
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
  }, [checkoutSession, user]);

  const customer = checkoutSession?.customer_details;
  const shippingAddress = checkoutSession?.shipping_details;
  const products = checkoutSession?.line_items?.data?.map((item: { price: { product: object; unit_amount: number; }; quantity: number; }) => ({
    ...item.price.product,
    price: item.price.unit_amount,
    quantity: item.quantity
  }));
  const subtotal = checkoutSession?.amount_subtotal;
  const shipping = checkoutSession?.total_details?.amount_shipping;
  const total = checkoutSession?.amount_total;
  const currency = checkoutSession?.currency;
  const discount = checkoutSession?.total_details?.amount_discount;
  const tax = checkoutSession?.total_details?.amount_tax;

  // create order
  useEffect(() => {
    if (checkoutSession.payment_status === 'paid') {
      (async () => {
        const results = await fetch('/api/orders', {
          method: 'PUT',
          body: JSON.stringify({
            stripePaymentIntentId: checkoutSession.payment_intent.id,
            customer: checkoutSession.customer_details,
            products: checkoutSession,
            subtotal: (checkoutSession.amount_subtotal / 100).toFixed(2),
            shipping: (checkoutSession.total_details.amount_shipping / 100).toFixed(2),
            total: (checkoutSession.amount_total / 100).toFixed(2),
            currency: checkoutSession.currency.toUpperCase(),
            discount: (checkoutSession.total_details.amount_discount / 100).toFixed(2),
            tax: (checkoutSession.total_details.amount_tax / 100).toFixed(2),
          })
        });
        const data = await results.json();
        console.log("order data: ")
        console.log(data);
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
                {shippingAddress?.name}
                <br />
                {shippingAddress?.address?.line1}
                <br />
                {shippingAddress?.address?.line2?.length > 0 ? shippingAddress?.address.line2 : null}
                {shippingAddress?.address?.line2?.length > 0 ? <br /> : null}
                {shippingAddress?.address?.city}, {shippingAddress?.address?.state} {shippingAddress?.address?.postal_code}
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