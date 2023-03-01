import '../utils/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/sessionApiUtils';
import { Layout } from '../layout';

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({ role: 'Customer' });

  useEffect(() => {
    (
      async () => {
        try {
          const response = await getCurrentUser();
          setUser(response);
          setAuth(true);
        } catch (err) {
          console.log(err);
          setAuth(false);
        }
      }
    )();
  }, []);
  
  return (
    <div>
      <Layout auth={auth} user={user} />
      <Component {...pageProps} />
    </div>
    
  );
};
