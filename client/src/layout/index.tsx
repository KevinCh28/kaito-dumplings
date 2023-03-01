import Link from 'next/link';
import { useState, useEffect } from 'react';
import { logout } from '../utils/sessionApiUtils';
import {useRouter} from 'next/router';

export function Layout(props: { auth: boolean }) {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const openCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(true);
  };

  const closeCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(false);
  };

  const handleLogout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout()
      .then((res) => {
        if (window.location.pathname === '/account') {
          window.location.href = '/';
        } else {
          window.location.reload();
        }
      })
  };
  
  // Selectively render links based on user state
  const userLinks = () => {
    if (props.auth) {
      return (
        <>
          <Link href="/account">
            My Account
          </Link>
          <button onClick={handleLogout}>
            Log Out
          </button>
          { cartModalOpen ? (
            <button onClick={openCartModal}>
              Cart
            </button>
          ) : (
              <button onClick={closeCartModal}>
                Cart
              </button>
            )
          }
        </>
      )
    } else {
      return (
        <>
          <Link href="/login">
            Login
          </Link>
          <Link href="/register">
            Register
          </Link>
          {cartModalOpen ? (
            <button onClick={openCartModal}>
              Cart
            </button>
          ) : (
            <button onClick={closeCartModal}>
              Cart
            </button>
          )}
        </>
      )
    }
  };

  return (
    <>
      <nav className="navbar">
          <div className="navbar__logo">
          <Link href="/">LOGO</Link>
          </div>
          <div className="navbar_links">
          <Link href="/products">Products</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog">Blog</Link>
          </div>
          <div>
          <Link href="/products">ORDER NOW</Link>
          </div>
          { userLinks() }
      </nav>
    </>
  )
};