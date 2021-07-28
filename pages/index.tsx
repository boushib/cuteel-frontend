import Link from 'next/link'
import Head from '../components/Head'
import { Button } from '../components/Button'

const Home = () => (
  <div className="home page">
    <div className="container">
      <Head title="Home" />
      <h1>Home</h1>
      <div>
        <Link href="/catalog" passHref={true}>
          <Button>Browse catalog</Button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
