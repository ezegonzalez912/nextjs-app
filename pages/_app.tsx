import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { FirebaseProvider } from '../context/firebase/firebaseContext'
import { ModalProvider } from '../context/Modal/modalContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <FirebaseProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </FirebaseProvider>
  )
}

export default MyApp