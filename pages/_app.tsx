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
    overflow-x: hidden;
  }

  div, p, li, span {
    color: #777;
  }

  h1, h2, h3 {
    color: #777;
    margin-bottom: 16px;
    font-weight: 600;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 24px;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    margin: -20px;
    & > div {
      margin: 20px
    }
  }

  .page {
    padding: 40px 0;
    min-height: calc(100vh - 140px);
  }

  .form-control {
    border: none;
    outline: none;
    padding: 12px 20px;
    border-radius: 4px;
    width: 100%;
    max-width: 660px;
    display: block;
    margin-bottom: 16px;
    color: #666;
    font-size: 15px;
    &::placeholder {
      color: #999;
    }
  }

  textarea {
    resize: none;
    height: 92px;
  }

  label {
    font-size: 15px;
    display: block;
    margin-bottom: 8px;
    color: #aaa;
  }

  .form__step {
    font-size: 15px;
    width: 25%;
    text-align: center;
    position: relative;
    &.done {
      .form__step__number,
      &::after {
        background-color: #89b24a;
      }
    }
    &.current,
    &.done {
      .form__step__name {
        color: #89b24a;
      }
      .form__step__number,
      &::before {
        background-color: #89b24a;
      }
    }
    &:first-child {
      &::before {
        display: none;
      }
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: 50%;
      background-color: #bbb;
      top: 13px;
      z-index: -1;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
    &s {
      display: flex;
      max-width: 800px;
      margin: 0 auto 24px;
    }
    &__number {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #bbb;
      color: #fff;
      border-radius: 50%;
      font-size: 14px;
      margin: 0 auto 12px;
      svg {
        width: 14px;
      }
    }
    &__name {
      color: #999;
    }
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
