import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Navbar from '../components/Navbar'

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
    padding: 130px 0 40px;
  }

  .form-control {
    border: none;
    outline: none;
    padding: 12px 20px;
    border-radius: 4px;
    width: 100%;
    display: block;
    margin-bottom: 16px;
  }
`

const theme = {
  colors: {
    primary: '#89b24a',
  },
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
