import type { AppProps } from 'next/app'
import '../utils/icons/font-awesome'
import '../utils/styles/globals.scss'
import '../utils/styles/navbar.scss'
import '../utils/styles/homepage.scss'
import '../utils/styles/modal.scss'
import '../utils/styles/cart.scss'
import '../utils/styles/productsPage.scss'
import '../utils/styles/productShowPage.scss'
import '../utils/styles/account.scss'
import '../utils/styles/footer.scss'
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  console.log("in app")
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return (
    <div className='off_canvas_main_content'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};
