import { useState, useEffect, SyntheticEvent } from 'react';
import { getCart, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } from '../../utils/cartApiUtils';
import { getCurrentUser } from '@/src/utils/sessionApiUtils';
import { getProducts } from '@/src/utils/productApiUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
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

  // Calculates $ subtotal of cart
  useEffect(() => {
    let total = 0;
    cart.forEach((item: any) => {
      products.forEach((product: any) => {
        if (item.productId === product._id) {
          total += product.price * item.quantity;
        }
      })
    })
    setTotalAmount(total);
  }, [cart, products]);

  // Updates free shipping progress bar
  useEffect(() => {
    const progressBar = document.getElementById('free_shipping_status_bar_progress');
    progressBar.style.width = totalAmount > 98.99 ? '100%' : `${totalAmount}%`;
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

  // Renders cart items
  const handleCartItems = () => {
    if (cart.length > 0) {
      return cart.map((item: any) => {
        return (
          <div className='cart_items_container'>
            <ul className='cart_items'>
              {products.map(product => {
                if (item.productId === product._id) {
                  return (
                    <li key={product._id}>
                      <div className='item_image_container'>
                        <a href="" >
                          <img src={product.imageUrl} alt={product.name} />
                        </a>
                      </div>
                      <div className='cart_item_info'>
                        <button className='cart_item_remove_button' onClick={() => handleRemoveItem(userId, item.productId)}>
                          <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                          <span className='hiddenSpan'>Remove {product.category} {product.name} from Cart</span>
                        </button>
                        <a href="" className='cart_item_category'>{product.category}</a>
                        <div className='cart_item_name'>{product.name}</div>

                        <div className='item_quantity_container'>
                          <div className='item_quantity_wrapper'>
                            <button className='item_quantity_button' onClick={() => handleMinusQuantity(userId, item.productId)}>
                              <i><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></i>
                              <span className='hiddenSpan'></span>
                            </button>
                            <span className='item_quantity_button'>{item.quantity}</span>
                            <button className='item_quantity_button' onClick={() => handleAddQuantity(userId, item.productId)}>
                              <i><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></i>
                              <span className='hiddenSpan'></span>
                            </button>
                          </div>
                        </div>

                        <div className='item_total_price'>
                          <div>
                            <span>${(product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>

                      </div>
                    </li>
                  )
                }
              })
              };
            </ul>
            <div className='cart _products_recommendations_container'>Recommendations</div>
          </div>
        )
      })
    }
  }

  const handleAddQuantity = ( userId: any, productId: any ) => {
    increaseItemQuantity(userId, productId).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  const handleMinusQuantity = (userId: any, productId: any) => {
    decreaseItemQuantity(userId, productId).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  const handleRemoveItem = (userId: any, productId: any) => {
    removeItemFromCart(userId, productId).then((res) => {
      getCart(userId)
        .then((res) => {
          setCart(res.data.products);
        }
      )
    })
  };

  return (
    <div className='cart_container'>
      <div className='cart_free_shipping_container'>
        {handleCartFreeShippingMessage()}
        <div className='free_shipping_status_bar'>
          <span></span>
          <div id='free_shipping_status_bar_progress' className='free_shipping_status_bar_progress'></div>
        </div>
      </div>
      {handleCartItems()}
    </div>
  );
};

export default Cart;