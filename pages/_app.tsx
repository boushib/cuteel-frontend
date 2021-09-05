import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/components/GlobalStyle'
import Navbar from '@/components/Navbar'
import Spinner from '@/components/Spinner'
import { AuthProvider, CartProvider, WishlistProvider } from '@/store/providers'
import Footer from '@/components/Footer'
import '../styles/globals.css'
import Layout from '@/components/Layout'
import { AppProps } from 'next/app'

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
              <Layout pageProps={pageProps} Component={Component} />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
