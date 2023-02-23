import Link from 'next/link';
import { useState, useEffect } from 'react';
import { logout } from '../../utils/sessionApiUtils';

export default function Navbar(props: { auth: boolean; user: any; }) {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [auth, setAuth] = useState(props.auth);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setAuth(props.auth);
    setUser(props.user);
  }, [props.auth, props.user]);

  const openCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(true);
  };

  const closeCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(false);
  };

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout();
    window.location.href = "/";
  };

  // Selectively render links based on user state
  const userLinks = () => {
    if (auth) {
      if (user.role === 'admin') {
        return (
          <>
            <Link href="/admin/dashboard">
              Admin Dashboard
            </Link>
            <button onClick={logout}>
              Log Out
            </button>
          </>
        )
      } else {
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
      }
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

  // If user is logged in, render button that links to account
  // If user is not logged in, render button that links to login
  // If user is admin, render button that links to admin dashboard
  // const userLinks = () => {
  //   let currentUser = null;
  //   let buttons = <div></div>;

  //   if (currentUser !== null) {
  //     if (currentUser.isAdmin) {
  //       buttons = <div><Link href="/admin/dashboard">Admin Dashboard</Link></div>
  //     } else {
  //       buttons = <div><Link href="/account">My Account</Link></div>
  //     }
  //   } else {
  //     buttons = <div><Link href="/login">Login</Link></div>
  //   }

  //   return buttons;
  // };

  return (
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
  )
};