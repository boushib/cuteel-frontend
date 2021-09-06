import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import ProductCard from '@/components/dashboard/ProductCard'
import { Button } from '@/components/Button'

const getProducts = async () => {
  try {
    const { data } = await api.get('/products')
    return data.products
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  const products: Array<Product> = await getProducts()
  return { props: { products } }
}

type Props = { products: Array<Product> }

const Products: React.FC<Props> = ({ products }) => (
  <>
    <Head title="Products" />
    <div className="products">
      <div className="page__header">
        <h2>Products</h2>
        <Link href="/dashboard/products/add" passHref>
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
  </>
)

export default Products
