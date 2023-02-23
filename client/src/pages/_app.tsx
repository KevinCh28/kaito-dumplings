import '../utils/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/sessionApiUtils';

export default function App({ Component, pageProps }: AppProps) {
  // const [auth, setAuth] = useState(false);
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await getCurrentUser();
  //       if (response) {
  //         setUser(response);
  //         setAuth(true);
  //       } else {
  //         setAuth(false);
  //       }
  //     }
  //   )();
  // }, []);
  
  return <Component {...pageProps} />
}
