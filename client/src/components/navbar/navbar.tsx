import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cart from '../cart/cart';
import { getCurrentUser } from '../../utils/sessionApiUtils';
import favicon from '../../../public/favicon.png'
import cartImage from '../../../public/cart.png'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [accountHover, setAccountHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((response) => {
      setUser(response);
      setAuth(true);
    }).catch((err) => {
      console.log(err);
      setAuth(false);
    });
  }, []);
  
  // Selectively render navbar links based on user authentication
  const userLinks = () => {
    if (auth) {
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
          <a href="/api/auth/login"
            className={loginHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
            onMouseOver={() => setLoginHover(true)}
            onMouseOut={() => setLoginHover(false)}>
            <span className='navbar_right_buttons_text'>LOG IN</span>
          </a>
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
    if (!showModal) {
      return null
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      return (
        <Cart onClose={() => setShowModal(false)} ></Cart>
      )
    }
  };

  const handleHiddenNav = () => {
    let header = document.getElementsByClassName("navbar_container")[0];
    if (window.scrollY > 250) {
      header.className = "navbar_container navbar_hidden";
    } else {
      header.className = "navbar_container";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHiddenNav);
    return () => window.removeEventListener("scroll", handleHiddenNav);
  }, []);

  useEffect(() => {
    if (!showModal) {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "";
    }
  }, [showModal]);

  return (
    <div className='navbar_main'>
      <div className='navbar_wrapper'>
        <header className={`navbar_container`}>
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