import { useState, useEffect } from 'react';
import { getProductsByIds } from '../../utils/productApiUtils';


const Cart = (cart: any) => {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {(
    async () => {
      try {
        const response = await getProductsByIds(cart);
        setCartItems(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleCartItems = () => {
    if (cartItems.length > 0) {
      return cartItems.map((item: any) => {
        <div>
          <div className="cart-item-image">
            <img src={item.imageUrl} alt="" />
          </div>
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <p>{item.category}</p>
            <p>{item.price}</p>
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

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item">
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