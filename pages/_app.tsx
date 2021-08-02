import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import { useState, useEffect } from 'react'
import router from 'next/router'
import { AuthProvider, CartProvider } from '../store'
import Footer from '../components/Footer'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: #f5f6f7;
  }

  div, p, li, span {
    color: #777;
  }

  h1, h2, h3 {
    color: #666;
    margin-bottom: 16px;
    font-weight: 600;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    & > div {
      margin: 20px
    }
  }

  .page {
    padding: 40px 0;
  }

  .form-control {
    border: none;
    outline: none;
    padding: 12px 20px;
    border-radius: 4px;
    width: 100%;
    display: block;
    margin-bottom: 16px;
    color: #666;
    font-size: 15px;
  }

  textarea {
    resize: none;
    height: 92px;
  }
`

const theme = {
  colors: {
    primary: '#89b24a',
  },
}

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const start = () => setIsLoading(true)
    const stop = () => setIsLoading(false)

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', stop)
    router.events.on('routeChangeError', stop)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', stop)
      router.events.off('routeChangeError', stop)
    }
  }, [])
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {isLoading && (
              <div className="page">
                <div className="container">
                  <Spinner />
                </div>
              </div>
            )}
            {!isLoading && <Component {...pageProps} />}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
