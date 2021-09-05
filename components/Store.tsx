import Footer from './Footer'
import Navbar from './Navbar'
import Spinner from './Spinner'

type Props = {
  pageProps: any
  Component: any
  isLoading: boolean
}

const Store: React.FC<Props> = ({ pageProps, Component, isLoading }) => (
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
)

export default Store
