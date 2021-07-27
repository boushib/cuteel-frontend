import Link from 'next/link'
import Navbar from '../components/Navbar'
import Head from '../components/Head'

const Home = () => (
  <div className="home page">
    <div className="container">
      <Head title="Home" />
      <h1>Home</h1>
      <div>
        <Link href="/catalog">Browse catalog</Link>
      </div>
      <div>
        <Link href="//google.com">
          <a target="_blank" rel="noreferrer noopener">
            Google
          </a>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
