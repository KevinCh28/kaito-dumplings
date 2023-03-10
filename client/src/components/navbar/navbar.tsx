import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cart from '../cart/cart';

const Navbar = (props: { auth: boolean,
  user: { firstname: string; lastname: string; email: string; _id: string; }
}) => {
  const [showModal, setShowModal] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [accountHover, setAccountHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  
  // Selectively render navbar links based on user authentication
  const userLinks = () => {
    if (props.auth) {
      return (
        <div className='navbar-right-wrapper'>
          <Link href="/account"
            className={accountHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
            onMouseOver={() => setAccountHover(true)}
            onMouseOut={() => setAccountHover(false)}>
            <span className='navbar_right_buttons_text'>ACCOUNT</span>
          </Link>
          <Link
            href="/products"
            className={orderHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
            onMouseOver={() => setOrderHover(true)}
            onMouseOut={() => setOrderHover(false)}>
            <span className='navbar_right_buttons_text'>ORDER NOW</span>
          </Link>
          <div onClick={() => setShowModal(true)} className="navbar_cart_container">
            <img src="/cart.png" alt="cart" className="navbar_cart_image"/>
          </div>
        </div>
      )
    } else {
      return (
        <div className='navbar-right-wrapper'>
          <Link href="/login"
            className={loginHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
            onMouseOver={() => setLoginHover(true)}
            onMouseOut={() => setLoginHover(false)}>
            <span className='navbar_right_buttons_text'>LOG IN</span>
          </Link>
          <Link
            href="/products"
            className={orderHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
            onMouseOver={() => setOrderHover(true)}
            onMouseOut={() => setOrderHover(false)}>
            <span className='navbar_right_buttons_text'>ORDER NOW</span>
          </Link>
          <div onClick={() => setShowModal(true)} className="navbar_cart_container">
            <img src="/cart.png" alt="cart" className="navbar_cart_image"/>
          </div>
        </div>
      )
    }
  };

  const handleCartModal = () => {
    if (!showModal) return null
    return (
      <Cart onClose={() => setShowModal(false)} ></Cart>
  )};

  return (
    <div className='navbar_main'>
      <div className='navbar_wrapper'>
        <header className="navbar_container">
          <div className='navbar'>
            <div className="navbar_left_wrapper">
              <div className="navbar_logo_wrapper">
                <Link className='navbar_logo' href="/">
                  <img src="/favicon.png" alt="logo" className='navbar_logo_image' />
                </Link>
              </div>
            </div>
            <div className="navbar_middle_wrapper">
              <div className="navbar_middle_container">
                <div className='navbar_middle_products_container'>
                  <Link href="/products" className="navbar_middle_button">PRODUCTS</Link>
                </div>
                <div className='navbar_middle_more_wrapper'>
                  <ul className='navbar_middle_more_container'>
                    <li><Link href="/faq" className="navbar_middle_button">
                      <span className='navbar_right_buttons_text'>FAQ</span>
                    </Link></li>
                    <li><Link href="/blog" className="navbar_middle_button">
                      <span className='navbar_right_buttons_text'>BLOG</span>
                    </Link></li>
                  </ul>
                </div>
              </div>
            </div>
            {userLinks()}
          </div>
        </header>
        {handleCartModal()}
      </div>
    </div>
  )
};

export default Navbar;