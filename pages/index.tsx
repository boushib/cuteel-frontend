import api from '@/api'
import { Product } from '@/models'
import Head from '@/components/Head'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'

const getProducts = async () => {
  const { data } = await api.get('/products')
  return data.products
}

export const getServerSideProps = async () => {
  const products: Array<Product> = await getProducts()
  return { props: { products } }
}

type Props = {
  products: Array<Product>
}

const Home: React.FC<Props> = ({ products }) => (
  <div className="home page" style={{ paddingTop: 0 }}>
    <Head title="Home" />
    <Hero />
    <FeaturedProducts products={products} />
  </div>
)

export default Home
