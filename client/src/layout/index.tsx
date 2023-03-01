import Link from 'next/link';
import { useState } from 'react';

export function Layout(props: { auth: boolean, user: { firstName: string; lastName: string; email: string; _id: string; }; }) {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [orderHover, setOrderHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);

  const openCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(true);
  };

  const closeCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(false);
  };
  
  // Selectively render navbar links based on user authentication
  const userLinks = () => {
    if (props.auth) {
      return (
        <div className='navbar_right_container'>
          <div className='navbar-right-buttons-container'>
            <Link href="/account">
              ACCOUNT
            </Link>
          </div>
          <div onClick={openCartModal} className="navbar_cart_container">
            <img src="/cart.png" alt="cart" className="navbar_cart_image"/>
          </div>
        </div>
      )
    } else {
      return (
        <div className='navbar_right_container'>
          <div className='navbar-right-buttons-container'>
            <Link href="/login"
              className={loginHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
              onMouseOver={() => setLoginHover(true)}
              onMouseOut={() => setLoginHover(false)}
            >LOGIN
            </Link>
          </div>
          
          <div className='navbar-right-buttons-container'>
            <Link
              href="/products"
              className={orderHover ? 'navbar_right_button_hover' : 'navbar_right_button'}
              onMouseOver={() => setOrderHover(true)}
              onMouseOut={() => setOrderHover(false)}
            >ORDER NOW
            </Link>
          </div>
          <div onClick={openCartModal} className="navbar_cart_container">
            <img src="/cart.png" alt="cart" className="navbar_cart_image"/>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      <nav className="navbar">
          <div className="navbar_left_container">
            <Link href="/">
              <img src="/favicon.png" alt="logo" className='navbar_logo'/>
            </Link>
          </div>
          <div className="navbar_middle_container">
            <div className="navbar_middle_buttons_container">
              <Link href="/products" className="nav_middle_button">PRODUCTS</Link>
              <Link href="/faq" className="nav_middle_button">FAQ</Link>
              <Link href="/blog" className="nav_middle_button">BLOG</Link>
            </div>
          </div>
          { userLinks() }
      </nav>
    </>
  )
};