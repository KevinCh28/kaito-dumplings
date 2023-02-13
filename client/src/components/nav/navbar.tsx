import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // const logoutUser = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   logout();
  // };

  const openCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(true);
  };

  const closeCartModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCartModalOpen(false);
  };

  // Selectively render links based on user state
  // const userLinks = () => {
  //   if (user) {
  //     if (user.isAdmin) {
  //       return (
  //         <>
  //           <Link href="/admin/dashboard">
  //             <a>Admin Dashboard</a>
  //           </Link>
  //           <button onClick={logoutUser}>
  //             Log Out
  //           </button>
  //         </>
  //       )
  //     } else {
  //       return (
  //         <>
  //           <Link href="/account">
  //             <a>My Account</a>
  //           </Link>
  //           <button onClick={logoutUser}>
  //             Log Out
  //           </button>
  //           { cartModalOpen ? (
  //             <button onClick={openCartModal}>
  //               Cart
  //             </button>
  //           ) : (
  //               <button onClick={closeCartModal}>
  //                 Cart
  //               </button>
  //             )
  //           }
  //         </>
  //       )
  //     }
  //   } else {
  //     return (
  //       <>
  //         <Link href="/login">
  //           <a>Login</a>
  //         </Link>
  //         <Link href="/register">
  //           <a>Register</a>
  //         </Link>
  //         {cartModalOpen ? (
  //           <button onClick={openCartModal}>
  //             Cart
  //           </button>
  //         ) : (
  //           <button onClick={closeCartModal}>
  //             Cart
  //           </button>
  //         )}
  //       </>
  //     )
  //   }
  // };

  // If user is logged in, render button that links to account
  // If user is not logged in, render button that links to login
  // If user is admin, render button that links to admin dashboard
  const userLinks = () => {
    let currentUser = null;
    let buttons = <div></div>;

    if (currentUser !== null) {
      if (currentUser.isAdmin) {
        buttons = <div><Link href="/admin/dashboard">Admin Dashboard</Link></div>
      } else {
        buttons = <div><Link href="/account">My Account</Link></div>
      }
    } else {
      buttons = <div><Link href="/login">Login</Link></div>
    }

    return buttons;
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link href="/">LOGO</Link>
      </div>
      <div className="navbar_links">
        <Link href="/products">Products</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div>
        <Link href="/products">ORDER NOW</Link>
      </div>
      { userLinks() }
    </nav>
  )
};