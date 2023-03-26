
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { checkout } from '@/src/lib/checkout';

const Cart = ({ onClose = () => { } }) => {
  const [recommended, setRecommended] = useState<{ [key: string]: boolean }>({
    'dumplings': true,
    'gyoza': true,
  });
  // const [recommendedProducts, setRecommendedProducts] = useState([{
  //   _id: '',
  //   name: '',
  //   category: '',
  //   price: 0,
  //   imageUrl: '',
  //   description: '',
  //   stripeId: '',
  // }]);
  const [cart, setCart] = useState({
    products: [{
      quantity: 0,
      product: {
        _id: '',
        name: '',
        category: '',
        price: 0,
        imageUrl: '',
        description: '',
        stripeId: '',
      }
    }],
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [userId, setUserId] = useState('');
  const [products, setProducts] = useState<{
    _id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string,
    stripeId: string,
  }[] | null>(null);

  // Gets user's id
  // useEffect(() => {
  //   (async () => {
  //     const results = await fetch('/api/users');
  //     const data = await results.json();
  //     setUserId(data.id)
  //   })();
  // }, []);
  
  // Gets user's cart
  useEffect(() => {
    (async () => {
      const results = await fetch('/api/carts');
      const data = await results.json();
      setCart(data)
    })();
  }, []);

  // Get Products
  // useEffect(() => {
  //   (async () => {
  //     const results = await fetch('/api/products');
  //     const data = await results.json();
  //     setProducts(data)
  //   })();
  // }, []);

  // useEffect(() => {
  //   cart.products.map((item: object) => {
  //     if (recommended[item.product.category] === true) setRecommended({ ...recommended, [item.product.category]: false });
  //   })
  // }, [cart]);

  // Gets recommended products
  // useEffect(() => {
  //   if (recommended.dumplings && recommended.gyoza) {
  //     setRecommendedProducts([products[0], products[6]]);
  //   } else if (recommended.dumplings) {
  //     setRecommendedProducts([products[6]]);
  //   } else if (recommended.gyoza) {
  //     setRecommendedProducts([products[0]]);
  //   }
  // }, [recommended]);

  // Calculates subtotal items and amount in cart
  useEffect(() => {
    let total = 0;
    let totalCartItems = 0

    if (cart.products.length > 0 ) {
      cart.products.forEach((item: { quantity: number, product: { price: number } }) => {
        totalCartItems += item.quantity;
        total += item.product.price * item.quantity;
      });
    };
    setTotalItems(totalCartItems);
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  // Updates free shipping progress bar
  useEffect(() => {
    const element = document.getElementsByClassName('free_shipping_status_bar_progress')[0] as HTMLDivElement;

    if (totalAmount < 1) {
      element.style.width = '0%';
      element.style.opacity = '0';
    } else {
      element.style.width = totalAmount > 98.99 ? '100%' : `${(totalAmount / 99) * 100}%`;
      element.style.opacity = '1';
    }
  }, [totalAmount])

  // Updates free shipping progress text
  const handleCartFreeShippingMessage = () => {
    if (totalAmount < 99) {
      return (
        <div className='free_shipping_text'>
          You are ${(99 - totalAmount).toFixed(2)} away from
          <b> FREE SHIPPING</b>
        </div>
      )
    } else {
      return (
        <div className='free_shipping_text'>
          🎉 Congrats! You have unlocked
          <b> FREE SHIPPING!</b>
        </div>
      )
    }
  };

  // Renders recommended products based on empty cart
  // const mapProducts = () => {
  //   recommendedProducts.map((product: object) => {
  //     if (recommendedProducts.length === 0) {
  //       return (
  //         <div className='cart_product_recommendation_container'></div>
  //       )
  //     }
  //     return (
  //       <div className='cart_product_recommendation_container'>
  //         <div className='cart_product_recommendation_image_container'>
  //           <Link href={`${product.category}-${(product.name.split(' ').join('-')).toLowerCase()}`}>
  //             <img src={product.imageUrl} alt={product.name} />
  //           </Link>
  //         </div>
  //         <div className='cart_product_recommendation_info'>
  //           <Link href={`${product.category}-${(product.name.split(' ').join('-')).toLowerCase()}`}>{product.category}</Link>
  //           <div className='cart_product_recommendation_info_price'>
  //             <div>
  //               <span>${product.price}</span>
  //               <span></span>
  //             </div>
  //           </div>
  //         </div>
  //         <div className='cart_product_recommendation_other_flavors_container'>
  //           <select name="" id="">
  //             <option value="">Beef & Cheese</option>
  //             <option value="">Pork & Chieves</option>
  //             <option value="">Chicken & Cabbage</option>
  //             <option value="">Veggie</option>
  //           </select>
  //         </div>
  //         <div className='cart_product_recommendation_add_to_cart_button_container'>
  //           <button className='cart_product_recommendation_add_to_cart_button' onClick={handleAddQuantity(product)}>
  //             <span>ADD</span>
  //           </button>
  //         </div>
  //       </div>
  //     )
  //   })
  // };

  // Renders cart items
  const handleCartItems = () => {
    if (cart.products.length > 0) {
      return (
        <div className='cart_items_container'>
          <ul className='cart_items'>
            {cart.products.map((item: { product: { _id: string, category: string, name: string, imageUrl: string, price: number }, quantity: number }) => {
              if (recommended[item.product.category] === true) setRecommended({ ...recommended, [item.product.category]: false });
              return (
                <li className='cart_item_container' key={item.product._id}>
                  <div className='item_image_container'>
                    <Link href="" >
                      <img src={item.product.imageUrl} alt={item.product.name} />
                    </Link>
                  </div>
                  <div className='cart_item_info'>
                    <button className='cart_item_remove_button' onClick={() => handleRemoveItem(item.product)}>
                      <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                      <span className='hiddenSpan'>Remove {item.product.category} {item.product.name} from Cart</span>
                    </button>
                    <Link href="" className='cart_item_category'>{item.product.category}</Link>
                    <div className='cart_item_name'>{item.product.name}</div>

                    <div className='item_quantity_container'>
                      <div className='item_quantity_wrapper'>
                        <button className='item_quantity_button' onClick={() => handleMinusQuantity(item.product)}>
                          <i><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></i>
                          <span className='hiddenSpan'></span>
                        </button>
                        <span className='item_quantity_number'>{item.quantity}</span>
                        <button className='item_quantity_button' onClick={() => handleAddQuantity(item.product)}>
                          <i><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></i>
                          <span className='hiddenSpan'></span>
                        </button>
                      </div>
                    </div>

                    <div className='item_total_price'>
                      <div>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                </li>
              )
            })}
          </ul>
          <div className='cart_products_recommendations_wrapper'>
            <h3 className='cart_products_recommendations_header'>YOU MAY ALSO LIKE</h3>
            <div className='cart_products_recommendations_grid'>
              {/* {mapProducts()} */}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='cart_items_container'>
          <div className='empty_cart_container'>
            <h4 className='empty_cart_header'>YOUR CART IS EMPTY!</h4>
            <p className='empty_cart_text'>Add some dumplings and gyozas.</p>
            <p className='empty_cart_button'>
              <Link href="/products">Shop Now</Link>
            </p>
          </div>
          <div className='empty_cart_footer_container'>
            <div></div>
          </div>
          <div className='cart_products_recommendations_wrapper'>
            <h3 className='cart_products_recommendations_header'>YOU MAY ALSO LIKE</h3>
            <div className='cart_products_recommendations_grid'>
              {/* {mapProducts()} */}
            </div>
          </div>
        </div>
      )
    }
  }

  const handleAddQuantity = (product: object ) => {
    (async () => {
      const results = await fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product, quantity: 1 })
      })
      const data = await results.json();
      setCart({ ...cart, products: data.filteredProducts });
    })();
  };

  const handleMinusQuantity = (product: object ) => {
    (async () => {
      const results = await fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product, quantity: -1 })
      })
      const data = await results.json();
      setCart({ ...cart, products: data.filteredProducts });
    })();
  };

  const handleRemoveItem = ( product: object ) => {
    (async () => {
      const results = await fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product, quantity: -999 })
      })
      const data = await results.json();
      setCart({ ...cart, products: data.filteredProducts });
    })();
  };

  const handleCheckOut = () => {
    let items = cart.products.map((item: { quantity: number, product: { stripeId: string } }) => {
      return {
        quantity: item.quantity,
        product: { stripeId: item.product.stripeId }
      };
    });
    checkout(items, totalAmount)
  };

  return (
    <div>
      <div className="modal_container">
        <div className='modal_header_container'>
          <div>
            <h2 className='modal_header_text'>YOUR CART</h2>
          </div>
          <button className='modal_header_close_button' onClick={onClose}>
            <i><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></i>
            <span>Close Cart</span>
          </button>
        </div>
        <div className='cart_container'>
          <div className='cart_free_shipping_container'>
            {handleCartFreeShippingMessage()}
            <div className='free_shipping_status_bar'>
              <div className='free_shipping_status_bar_progress'></div>
            </div>
          </div>
          {handleCartItems()}
        </div>

        {totalItems > 0 ? 
          <div className='cart_summary_container'>
            <div className='cart_sub_total'>
              <div className='sub_total_text'>
                <span>Subtotal ({totalItems} items)</span>
              </div>
              <div className='subtotal_amount'>${totalAmount.toFixed(2)}</div>
            </div>

            <div className='cart_action_buttons_container'>
              <button className='cart_checkout_button' onClick={handleCheckOut}>
                <span><i className='cart_checkout_button_image'><FontAwesomeIcon icon={faLock}></FontAwesomeIcon></i> Checkout </span>
              </button>
              <button className='cart_continue_shopping_button' onClick={onClose}>
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
          :
          null
        } 

        <div className='cart_footer_container'>
          <div className='cart_footer_image'>
            <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/ice-dark.png?v=1667978802" alt="" />
            <span>
              Melt-Free
              <br />
              Guarantee
            </span>
          </div>
          <div className='cart_footer_image'>
            <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/Star-dark.png?v=1667978802" alt="" />
            <span>
              5000+
              <br />
              5-Star Reviews
            </span>
          </div>
          <div className='cart_footer_image'>
            <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/fast-delivery-dark.png?v=1667978802" alt="" />
            <span>
              Free Shipping on
              <br />
              Orders $99+
            </span>
          </div>
        </div>
      </div>
      <div className='cart_modal_background_is_visible'></div>
    </div>
  );
};

export default Cart;