import Head from '../../components/Head'
import api from '../../api'
import { Product } from '../../models'
import ProductCard from '../../components/ProductCard'
import { Button } from '../../components/Button'
import Link from 'next/link'

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

const Products: React.FC<Props> = ({ products }) => (
  <>
    <Head title="Catalog" />
    <div className="products page">
      <div className="container">
        <div className="page__header">
          <h1>Catalog</h1>
          <Link href="/products/add" passHref>
            <Button>Add Product</Button>
          </Link>
        </div>
        {products && products.length > 0 && (
          <div className="grid">
            {products.map((p) => (
              <ProductCard product={p} key={p._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  </>
)

export default Products
