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
  const [showMobileModal, setShowMobileModal] = useState(false);
  const { user } = useUser();
  let lowestScrollPosition = -1;
  let highestScrollPosition = 1;

  // Handle rendering navbar menu for mobile
  const handleMobileModal = () => {
    if (!showMobileModal) {
      return null
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      return (
        <div className='navbar_mobile_menu_modal'>
          <div className='navbar_mobile_menu_modal_content'>
            <div className='navbar_mobile_menu_modal_close' onClick={handleCloseMobileModal}>
              <i className='navbar_mobile_menu_modal_close_image'><FontAwesomeIcon icon={faX}></FontAwesomeIcon></i>
            </div>
            <div className='navbar_mobile_menu_modal_content_wrapper'>
              <div className='navbar_mobile_menu_modal_content_container'>
                <ul className='navbar_mobile_menu_modal_content_menu'>
                  <li className='navbar_mobile_menu_modal_products'>
                    <Link href="/products" onClick={handleCloseMobileModal}>PRODUCTS</Link>
                  </li>
                  <nav className='navbar_mobile_menu_modal_product_links'>
                    <Link href="/products/dumplings-beef-&-cheese" onClick={handleCloseMobileModal}>DUMPLINGS</Link>
                    <Link href="/products/gyoza-beef-&-cheese" onClick={handleCloseMobileModal}>GYOZAS</Link>
                    <Link href="/products/sauces-sauce-bundle" onClick={handleCloseMobileModal}>SAUCES</Link>
                  </nav>
                </ul>
                <ul className='navbar_mobile_menu_modal_content_secondary_menu'>
                  <li><Link href='/blog/aboutus' onClick={handleCloseMobileModal}>ABOUT US</Link></li>
                  {/* <li><Link href='/blog/press' onClick={handleCloseMobileModal}>PRESS</Link></li> */}
                  <li><Link href='/shipping' onClick={handleCloseMobileModal}>SHIPPING</Link></li>
                  <li><Link href='/account' onClick={handleCloseMobileModal}>MY ACCOUNT</Link></li>
                  <li><Link href='/faq' onClick={handleCloseMobileModal}>FAQ</Link></li>
                </ul>
                <div className='navbar_mobile_menu_modal_footer'>
                  <Link className='navbar_mobile_menu_modal_footer_button' href='/products'>SHOP ALL PRODUCTS</Link>
                  <h4 className='navbar_mobile_menu_modal_footer_text'>FREE SHIPPING ON ORDERS OVER $99+</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  // Handle closing mobile menu
  const handleCloseMobileModal = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "";
    setShowMobileModal(false);
  };

  // Handle rendering cart modal
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

  // Handle hiding and showing navbar on scroll up and down
  const handleHiddenNav = () => {
    let header = document.getElementsByClassName("navbar_container")[0];

    if (window.scrollY > highestScrollPosition) {
      highestScrollPosition = window.scrollY;
    }

    if (window.scrollY >= lowestScrollPosition + 250) {
      lowestScrollPosition = window.scrollY - 1;
      highestScrollPosition = window.scrollY + 1;
      header.className = "navbar_container navbar_hidden";
    } else if (highestScrollPosition - window.scrollY >= 250) {
      lowestScrollPosition = window.scrollY - 1;
      highestScrollPosition = window.scrollY + 1;
      header.className = "navbar_container";
    } else if (window.scrollY <= 250) {
      lowestScrollPosition = window.scrollY - 1;
      highestScrollPosition = window.scrollY + 1;
      header.className = "navbar_container";
    }
  };

  // Add event listener for scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleHiddenNav);
    return () => window.removeEventListener("scroll", handleHiddenNav);
  }, []);

  // Handle removing overflow hidden from body when cart is closed so that the user can scroll on current page
  useEffect(() => {
    if (!showModal) {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "";
    }
  }, [showModal]);

  // Handle rendering MORE + or - icon depending on if hovered or not
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
                    <div className='navbar_middle_button_mobile' onClick={() => setShowMobileModal(true)}>
                      <i className='navbar_middle_button_mobile_image'><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></i>
                    </div>
                    <div className='navbar_middle_button' onMouseEnter={() => setMoreHover(true)} onMouseLeave={() => setMoreHover(false)}>
                      <span className='navbar_middle_button_text'>MORE </span>
                      {handleMoreImage()}
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
                <i className='navbar_cart_image'><FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon></i>
              </div>
            </div>
          </div>
        </header>
        {handleCartModal()}
        {handleMobileModal()}
      </div>
    </div>
  )
};

export default Navbar;