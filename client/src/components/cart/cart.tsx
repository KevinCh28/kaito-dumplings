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

  // Updates cart's modal free shipping progress bar to red
  useEffect(() => {
    const progressBar = document.getElementById('free_shipping_status_bar_progress');
    progressBar.style.width = totalAmount > 98.99 ? '100%' : `${totalAmount}%`;
  }, [])

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
        <div>
          <div className="cart-item-image">
            <img src={item.imageUrl} alt="" />
          </div>
          <div className="cart-item-info">
            <h4>{item.category}</h4>
            <h5>{item.name}</h5>
            <div>
              <button onClick={handleMinusQuantity} value={item.quanity}>-</button>
              <p>{item.quanity}</p>
              <button onClick={handleAddQuantity} value={item.quanity}>+</button>
            </div>
            <p>{item.price * item.quanity}</p>
          </div>
          <div className="cart-item-remove">
            <button>REMOVE</button>
          </div>
        </div>
      })
    } else {
      return null;
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

      <div className='cart-items'>
        <div className='cart-item'>
          {handleCartItems()}
        </div>
      </div>
      <div className="cart-total">
        <p>Total</p>
        <p>$10.00</p>
      </div>
      <div className="cart-buttons">
        <button>CHECKOUT</button>
        <button>CONTINUE SHOPPING</button>
      </div>
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <div className="cart-empty-image">
          IMAGE
        </div>
      </div>
      <div className="cart-suggested-products">
        <div className="cart-suggested-product">
          <div className="cart-suggested-product-image">
            IMAGE
          </div>
          <div className="cart-suggested-product-info">
            <p>Product Name</p>
            <p>Product description</p>
            <p>Product description</p>
            <p>Product description</p>
          </div>
          <div className="cart-suggested-product-button">
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;