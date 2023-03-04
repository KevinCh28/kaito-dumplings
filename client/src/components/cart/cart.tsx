import { useState, useEffect, SyntheticEvent } from 'react';
import { getCart } from '../../utils/cartApiUtils';

const Cart = (userId: string) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    getCart(userId)
      .then((res) => {
        if (res.products.length > 0) {
          setCart(res.products);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  // Updates free shipping progress bar
  useEffect(() => {
    const progressBar = document.getElementById('free_shipping_status_bar_progress');
    progressBar.style.width = totalAmount > 98.99 ? '100%' : `${totalAmount}%`;
  }, [])

  // Updates free shipping progress text
  const handleCartFreeShippingMessage = () => {
    if (totalAmount < 90) {
      return (
        <div className='free_shipping_text'>
          You are ${99 - totalAmount} away from
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

  const handleCartItems = () => {
    if (cart.length > 0) {
      return cart.map((item: any) => {
        <div className='cart_items_container'>
          <ul className='cart_items'>
            {cart.map((item: any) => {
              return (
                <li key={item._id}>
                  <div className='item_image_container'>
                    <a href="" >
                      <img src={item.imageUrl} alt={item.name} />
                    </a>
                  </div>
                  <div className='cart_item_info'>
                    <button className='cart_item_remove_button'>
                      <i className='fa-trash'></i>
                      <span className='hiddenSpan'>Remove {item.category} {item.name} from Cart</span>
                    </button>
                    <a href="" className='cart_item_category'>{item.category}</a>
                    <div className='cart_item_name'>{item.name}</div>

                    <div className='item_quantity_container'>
                      <div className='item_quantity_wrapper'>
                        <button className='item_quantity_button'>
                          <i className='fa-minus'></i>
                          <span className='hiddenSpan'></span>
                        </button>
                        <span className='item_quantity_button'></span>
                        <button className='item_quantity_button'>
                          <i className='fa-plus'></i>
                          <span className='hiddenSpan'></span>
                        </button>
                      </div>
                    </div>

                    <div className='item_total_price'>
                      <div>
                        <span></span>
                      </div>
                    </div>

                  </div>
                </li>
              )}
            )}
          </ul>
          <div className='cart_products_recommendations_container'></div>
        </div>
      })
    } else {
      return (
        <div className="cart_empty">
          <h4>YOUR CART IS EMPTY!</h4>
          <p>Add some dumplings and gyozas.</p>
          <p>
            <a href="/products" className='cart_empty_shop_now_button'>Shop Now</a>
          </p>
        </div>
      )
    }
  };

  const handleAddQuantity = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e)
    // setCart();
  };

  const handleMinusQuantity = (e: SyntheticEvent) => {
    e.preventDefault();
    // setCart();
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