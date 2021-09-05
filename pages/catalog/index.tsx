import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/Button'

const getProducts = async (token: string) => {
  try {
    setToken(token)
    const { data } = await api.get('/products')
    return data.products
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies['token']
  const products: Array<Product> = await getProducts(token)
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
