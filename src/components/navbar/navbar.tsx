import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cart from '../cart/cart';
import CartUnAuth from '../cartUnAuth/cartUnAuth';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faBasketShopping, faX, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const [showMoblieModal, setShowMobileModal] = useState(false);
  const { user } = useUser();

  const handleMoblieModal = () => {
    if (!showMoblieModal) {
      return null
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      return (
        <div className='navbar_moblie_menu_modal'>
          <div className='navbar_moblie_menu_modal_content'>
            <div className='navbar_moblie_menu_modal_close' onClick={() => setShowMobileModal(false)}>
              <i className='navbar_moblie_menu_modal_close_image'><FontAwesomeIcon icon={faX}></FontAwesomeIcon></i>
            </div>
            <div className='navbar_moblie_menu_modal_content_wrapper'>
              <div className='navbar_moblie_menu_modal_content_container'>
                <ul className='navbar_moblie_menu_modal_content_menu'>
                  <li className='navbar_moblie_menu_modal_products'>
                    <Link href="/products" onClick={() => setShowMobileModal(false)}>PRODUCTS</Link>
                  </li>
                  <nav className='navbar_moblie_menu_modal_product_links'>
                    <Link href="/products/dumplings-beef-&-cheese" onClick={() => setShowMobileModal(false)}>DUMPLINGS</Link>
                    <Link href="/products/gyoza-beef-&-cheese" onClick={() => setShowMobileModal(false)}>GYOZAS</Link>
                    <Link href="/products/sauces-sauce-bundle" onClick={() => setShowMobileModal(false)}>SAUCES</Link>
                  </nav>
                </ul>
                <ul className='navbar_moblie_menu_modal_content_secondary_menu'>
                  <li><Link href='/blog' onClick={() => setShowMobileModal(false)}>ABOUT US</Link></li>
                  <li><Link href='/blog' onClick={() => setShowMobileModal(false)}>PRESS</Link></li>
                  <li><Link href='/shipping' onClick={() => setShowMobileModal(false)}>SHIPPING</Link></li>
                  <li><Link href='/account' onClick={() => setShowMobileModal(false)}>MY ACCOUNT</Link></li>
                  <li><Link href='/faq' onClick={() => setShowMobileModal(false)}>FAQ</Link></li>
                </ul>
                <div className='navbar_moblie_menu_modal_footer'>
                  <Link className='navbar_moblie_menu_modal_footer_button' href='/products'>SHOP ALL PRODUCTS</Link>
                  <h4 className='navbar_moblie_menu_modal_footer_text'>FREE SHIPPING ON ORDERS OVER $99+</h4>
                </div>
              </div>
            </div>
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
                <div className='navbar_middle_more_wrapper'>
                  <div className='navbar_middle_more_container'>
                    <div className='navbar_middle_button_moblie' onClick={() => setShowMobileModal(true)}>
                      <i className='navbar_middle_button_moblie_image'><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></i>
                    </div>
                    <div className='navbar_middle_button' onMouseOver={handleShowMoreList} onMouseOut={handleHideMoreList}>
                      <span className='navbar_middle_button_text'>MORE </span>
                      {handleMoreImage()}
                    </div>
                    <div className='navbar_more_list'>
                      <ul className='navbar_more_list_container'>
                        <li><Link href="/blog" className="navbar_more_list_item">BLOG</Link></li>
                        <li><Link href="/shipping" className="navbar_more_list_item">SHIPPING</Link></li>
                        <li><Link href="/account" className="navbar_more_list_item">MY ACCOUNT</Link></li>
                        <li><Link href="/faq" className="navbar_more_list_item">FAQ</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='navbar-right-wrapper'>
              <Link
                href="/products"
                className={orderHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
                onMouseOver={() => setOrderHover(true)}
                onMouseOut={() => setOrderHover(false)}>
                <span className='navbar_right_buttons_text'>ORDER NOW</span>
              </Link>
              <div onClick={() => setShowModal(true)} className="navbar_cart_container">
                {/* <img src="/cart.png" alt="cart" className="navbar_cart_image" /> */}
                <i className='navbar_cart_image'><FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon></i>
              </div>
            </div>
          </div>
        </header>
        {handleCartModal()}
        {handleMoblieModal()}
      </div>
    </div>
  )
};

export default Navbar;