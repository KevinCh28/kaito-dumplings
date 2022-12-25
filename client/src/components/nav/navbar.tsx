import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const logoutUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout();
  }

  const openCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(true);
  };

  const closeCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(false);
  };

  // Selectively render links based on user state
  const userLinks = () => {
    if (user) {
      if (user.isAdmin) {
        return (
          <>
            <Link href="/admin/dashboard">
              <a>Admin Dashboard</a>
            </Link>
            <button onClick={logoutUser}>
              Log Out
            </button>
          </>
        )
      } else {
        return (
          <>
            <Link href="/account">
              <a>My Account</a>
            </Link>
            <button onClick={logoutUser}>
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
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
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
    <nav className="navbar">
      <div className="navbar__logo">
        <Link href="/">
          <a>
            <img src="/logo.png" alt="Kaito Logo" />
          </a>
        </Link>
      </div>
      <div className="navbar_links">
        <Link href="/products">
          <a>Products</a>
        </Link>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      </div>
      { userLinks() }
    </nav>
  )
};