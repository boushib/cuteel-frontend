import Link from 'next/link'
import Head from '@/components/Head'
import api from '@/api'
import { Product } from '@/models'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/Button'

const getProducts = async () => {
  try {
    const { data } = await api.get('/products')
    return data.products
  } catch (error: any) {
    console.log(error.response)
  }
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
        <h2>Catalog</h2>
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
