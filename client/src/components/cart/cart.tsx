import { useState, useEffect } from 'react';
import { getCart, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } from '../../utils/cartApiUtils';
import { getCurrentUser } from '@/src/utils/sessionApiUtils';
import { createOrder } from '@/src/utils/orderApiUtils';
import { getProducts } from '@/src/utils/productApiUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ onClose = () => { } }) => {
  const recommended = {
    'dumplings': true,
    'gyoza': true,
  };
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [userId, setUserId] = useState('');
  const [products, setProducts] = useState([]);

  // Gets user's id
  useEffect(() => {
    getCurrentUser().then((res) => {
      setUserId(res._id);
    })
  }, []);
  
  // Gets user's cart
  useEffect(() => {
    getCart(userId)
      .then((res) => {
        setCart(res.data.products);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [userId]);

  // Gets all products
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    })
  }, []);

  // Update recommended category
  // useEffect(() => {
  //   cart.map((cartProduct: any) => {
  //     console.log(cartProduct)
  //     recommended[cartProduct.category] = false;
  //   })
  // }, [cart]);

  // Calculates subtotal items and amount in cart
  useEffect(() => {
    let total = 0;
    let totalCartItems = 0

    cart.forEach((item: any) => {
      totalCartItems += item.quantity;
      total += item.product.price * item.quantity;
    })
    setTotalItems(totalCartItems);
    setTotalAmount(total.toFixed(2));
  }, [cart]);

  // Updates free shipping progress bar
  useEffect(() => {
    const element = document.getElementsByClassName('free_shipping_status_bar_progress')[0];
    
    if (totalAmount === 0) {
      element.style.width = '0%';
      element.style.opacity = '0';
    } else {
      element.style.width = totalAmount > 98.99 ? '100%' : `${(totalAmount / 99) * 100}%`;
      element.style.opacity = '1';
    }
  }, [totalAmount])

  // Updates free shipping progress text
  const handleCartFreeShippingMessage = () => {
    if (totalAmount < 90) {
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
  const mapProducts = (
    products.map((product: any) => {
      if (recommended[product.category] === true) {
        recommended[product.category] = false;
        return (
          <div className='cart_product_recommendation_container'>
            <div className='cart_product_recommendation_image_container'>
              <a href={`/products/${product.category}-${(product.name.split(' ').join('-')).toLowerCase()}`}>
                <img src={product.imageUrl} alt={product.name} />
              </a>
            </div>
            <div className='cart_product_recommendation_info'>
              <a href={`/products/${product.category}-${(product.name.split(' ').join('-')).toLowerCase()}`}>{product.category}</a>
              <div className='cart_product_recommendation_info_price'>
                <div>
                  <span>${product.price}</span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className='cart_product_recommendation_other_flavors_container'>
              <select name="" id="">
                <option value="">Beef & Cheese</option>
                <option value="">Pork & Chieves</option>
                <option value="">Chicken & Cabbage</option>
                <option value="">Veggie</option>
              </select>
            </div>
            <div className='cart_product_recommendation_add_to_cart_button_container'>
              <button className='cart_product_recommendation_add_to_cart_button'>
                <span>ADD</span>
              </button>
            </div>
          </div>
        )
      }
    })
  );

  // Renders cart items
  const handleCartItems = () => {
    if (cart.length > 0) {
      return (
        <div className='cart_items_container'>
          <ul className='cart_items'>
            {cart.map((item: any) => {
              return (
                <li className='cart_item_container' key={item.productId}>
                  <div className='item_image_container'>
                    <a href="" >
                      <img src={item.product.imageUrl} alt={item.product.name} />
                    </a>
                  </div>
                  <div className='cart_item_info'>
                    <button className='cart_item_remove_button' onClick={() => handleRemoveItem(item.productId)}>
                      <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                      <span className='hiddenSpan'>Remove {item.product.category} {item.product.name} from Cart</span>
                    </button>
                    <a href="" className='cart_item_category'>{item.product.category}</a>
                    <div className='cart_item_name'>{item.product.name}</div>

                    <div className='item_quantity_container'>
                      <div className='item_quantity_wrapper'>
                        <button className='item_quantity_button' onClick={() => handleMinusQuantity(item)}>
                          <i><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></i>
                          <span className='hiddenSpan'></span>
                        </button>
                        <span className='item_quantity_number'>{item.quantity}</span>
                        <button className='item_quantity_button' onClick={() => handleAddQuantity(item)}>
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
              {mapProducts}
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
              <a href="">Shop Now</a>
            </p>
          </div>
          <div className='empty_cart_footer_container'>
            <div></div>
          </div>
          <div className='cart_products_recommendations_wrapper'>
            <h3 className='cart_products_recommendations_header'>YOU MAY ALSO LIKE</h3>
            <div className='cart_products_recommendations_grid'>
              {mapProducts}
            </div>
          </div>
        </div>
      )
    }
  }

  const handleAddQuantity = ( product: any ) => {
    increaseItemQuantity(userId, product, 1).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  const handleMinusQuantity = (product: any ) => {
    decreaseItemQuantity(userId, product).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  const handleRemoveItem = ( productId: any ) => {
    removeItemFromCart(userId, productId).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  const handleCheckOut = () => {
    createOrder({ userId, totalAmount, cart }).then((res) => {
      console.log('Order created successfully')
      console.log(res);
    })
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
              <div className='subtotal_amount'>${totalAmount}</div>
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