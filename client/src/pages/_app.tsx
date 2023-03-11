import '../utils/icons/font-awesome'
import '../utils/styles/globals.scss'
import '../utils/styles/navbar.scss'
import '../utils/styles/homepage.scss'
import '../utils/styles/modal.scss'
import '../utils/styles/cart.scss'
import '../utils/styles/productsPage.scss'
import '../utils/styles/productShowPage.scss'
import type { AppProps } from 'next/app'
import { Oswald } from '@next/font/google'
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/sessionApiUtils';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

const oswald = Oswald({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${oswald.className}`} >
    {/* <div className={`${oswald.className}`} style={{ backgroundColor: '#a9dde3' }}> */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};
