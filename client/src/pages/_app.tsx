import '../utils/styles/globals.scss'
import type { AppProps } from 'next/app'

import { UserProvider } from '../../context/userContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
