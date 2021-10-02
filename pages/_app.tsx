import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/components/GlobalStyle'
import {
  AuthProvider,
  CartProvider,
  ToastProvider,
  WishlistProvider,
} from '@/store/providers'
import Layout from '@/components/Layout'
import { AppProps } from 'next/app'
import '../styles/globals.css'

const theme = {
  colors: {
    primary: '#89b24a',
  },
}

const App = ({ pageProps, Component }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Layout pageProps={pageProps} Component={Component} />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
