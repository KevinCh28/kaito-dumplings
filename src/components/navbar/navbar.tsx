import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cart from '../cart/cart';
import CartUnAuth from '../cartUnAuth/cartUnAuth';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const [accountHover, setAccountHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const { user } = useUser();
  
  // Selectively render navbar links based on user authentication
  const userLinks = () => {
    if (user) {
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
          <Link href="/api/auth/login"
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
    if (!showModal) {
      return null
    } else if (showModal && user) {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      return (
        <Cart onClose={() => setShowModal(false)} ></Cart>
      )
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      return (
        <CartUnAuth onClose={() => setShowModal(false)} ></CartUnAuth>
      )
    }
  };

  // Hide cart when clicking outside of the carts container
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const className = (e.target as HTMLSpanElement).getAttribute('className');
      if (className !== 'modal_container' && showModal === true) {

        const parent = (e.target as HTMLSpanElement).closest('.modal_container');
        if (!parent && showModal === true) {
          setShowModal(false);
        }
      }
    };

    const options = { capture: true };
    const removeListener = window.addEventListener('click', handleOutsideClick, options);
    return () => window.removeEventListener('click', handleOutsideClick, options);
  }, [showModal]);

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

  const handleShowMoreList = () => {
    const moreList = document.getElementsByClassName("navbar_more_list")[0] as HTMLElement;
    moreList.style.display = "block";
    moreList.style.opacity = "1";
    setMoreHover(true);
  };

  const handleHideMoreList = () => {
    const moreList = document.getElementsByClassName("navbar_more_list")[0] as HTMLElement;
    moreList.style.display = "none";
    moreList.style.opacity = "0";
    setMoreHover(false);
  };

  const handleMoreImage = () => {
    if (!moreHover) {
      return (
        <i className='navbar_more_image_container'><FontAwesomeIcon icon={faPlus} className="navbar_more_image"></FontAwesomeIcon></i>
      )
    } else {
      return (
        <i className='navbar_more_image_container'><FontAwesomeIcon icon={faMinus} className="navbar_more_image"></FontAwesomeIcon></i>
      )
    }
  };

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
                <div className='navbar_middle_more_wrapper' onMouseOver={handleShowMoreList} onMouseOut={handleHideMoreList}>
                  <div className='navbar_middle_more_container'>
                    <div className='navbar_middle_button'>
                      <span className='navbar_middle_button_text'>MORE </span>
                      {handleMoreImage()}
                    </div>
                    <div className='navbar_more_list'>
                      <ul className='navbar_more_list_container'>
                        <li><Link href="/blog" className="navbar_more_list_item">BLOG</Link></li>
                        <li><Link href="/shipping" className="navbar_more_list_item">SHIPPING</Link></li>
                        <li><Link href="/faq" className="navbar_more_list_item">FAQ</Link></li>
                      </ul>
                    </div>
                  </div>
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