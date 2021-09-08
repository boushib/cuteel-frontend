import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import { Button, ButtonSmall } from '@/components/Button'

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
      {products.length === 0 && <p>No products yet!</p>}
      {products.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>In Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <ButtonSmall color="#3f51b5">View</ButtonSmall>
                    <ButtonSmall color="#f44336">Delete</ButtonSmall>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>
)

export default Products
