import { useState, useEffect } from 'react';

const Cart = (cart: any) => {
  const [cartItems, setCartItems] = useState([]);
  //takes in the user's cart from navbar
  //renders the cart items
  //renders the total price
  //renders the checkout button
  //renders the continue shopping button
  //renders the remove item button
  //renders the update quantity button
  //renders the cart is empty message
  //renders the cart is empty image
  //if quantity is updated, update user's cart
  //if item is removed, update user's cart
  //if cart is emptied, update user's cart
  //if checkout is clicked, redirect to checkout page
  //if continue shopping is clicked, redirect to products page
  //render 3 suggested products that is not current in the car, it has button to add to cart and button to select flavor
  //if add to cart is clicked, add to cart, update user's cart

  

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item">
          <div className="cart-item-image">
            IMAGE
          </div>
          <div className="cart-item-info">
            <p>Product Name</p>
            <p>Product description</p>
            <p>Product description</p>
            <p>Product description</p>
          </div>
          <div className="cart-item-quantity">
            <p>Quantity</p>
            <input type="number" min="1" max="10" value="1" />
          </div>
          <div className="cart-item-price">
            <p>Price</p>
            <p>$10.00</p>
          </div>
          <div className="cart-item-remove">
            <button>REMOVE</button>
          </div>
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