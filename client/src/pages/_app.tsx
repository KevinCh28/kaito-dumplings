import type { AppProps } from 'next/app'
import '../utils/icons/font-awesome'
import '../utils/styles/globals.scss'
import '../utils/styles/navbar.scss'
import '../utils/styles/homepage.scss'
import '../utils/styles/modal.scss'
import '../utils/styles/cart.scss'
import '../utils/styles/productsPage.scss'
import '../utils/styles/productShowPage.scss'
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
// import { Oswald } from '@next/font/google'

// const oswald = Oswald({
//   subsets: ['latin'],
//   weight: ['200', '300', '400', '500', '600', '700']
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='off_canvas_main_content'>
    {/* <div className={`${oswald.className}`} style={{ backgroundColor: '#a9dde3' }}> */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};
