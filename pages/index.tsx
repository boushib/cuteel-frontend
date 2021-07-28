import Link from 'next/link'
import Head from '../components/Head'
import { Button, ButtonSecondary } from '../components/Button'

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
      <div>
        <Link href="//google.com">
          <a target="_blank" rel="noreferrer noopener">
            <ButtonSecondary>Google</ButtonSecondary>
          </a>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
