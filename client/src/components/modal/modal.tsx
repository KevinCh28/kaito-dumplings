import { faTimes, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';

const Modal = ({ onClose = () => {}, children }) => {

  return (
    <div className="modal_overlay">
      <div className="modal_container">
        <div className='modal_header'>
          <div>
            <h2 className='modal_header_text'>YOUR CART</h2>
          </div>
          <div className='modal_header_close_button' onClick={onClose}>
            <i><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></i>
          </div>
        </div>
        {children}
        <div className='cart_summary_container'>
          <div className='cart_sub_total'>
            <div className='sub_total_text'>
              <span>Subtotal ( items)</span>
            </div>
            <div className='subtotal_amount'>$</div>
          </div>

          <div className='cart_action_buttons_container'>
            <button className='cart_checkout_button'>
              <span><i className='cart_checkout_button_image'><FontAwesomeIcon icon={faLock}></FontAwesomeIcon></i> Checkout </span>
            </button>
            <button className='cart_continue_shopping_button' onClick={onClose}>
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

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
      {/* <div className='modal_background'></div> */}
    </div>
  )
};

export default Modal;