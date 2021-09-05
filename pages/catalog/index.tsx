import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/Button'

const getProducts = async () => {
  //const token = window.localStorage.getItem('token')
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTJlYWZjNDM1OTljNzUxNzAxZmEyODIiLCJlbWFpbCI6ImVsQGdvb2dsZS5jb20iLCJpYXQiOjE2MzA0NTAwNzksImV4cCI6MTYzMDcwOTI3OX0.N1k60rVO3W5lDd3lsK97I0dBFF1vPdOBRM7q2lohigs'
    // setToken(token)
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const { data } = await api.get('/products')
    return data.products
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // req.cookies
  console.log({ HEADERS: ctx.req.cookies })
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
