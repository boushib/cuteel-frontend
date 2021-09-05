import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Spinner from './Spinner'
import Footer from './Footer'

type Props = {
  pageProps: any
  Component: any
}

const Layout: React.FC<Props> = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDashboard = router.pathname === '/admin'
  return (
    <>
      {isDashboard && (
        <div className="page dashboard">
          <div className="container">
            <h1>Dashboard</h1>
          </div>
        </div>
      )}
      {!isDashboard && (
        <>
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
        </>
      )}
    </>
  )
}

export default Layout
