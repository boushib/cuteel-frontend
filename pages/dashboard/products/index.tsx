import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import { Button, ButtonSmall } from '@/components/Button'

const getProducts = async () => {
  try {
    const { data } = (await api.get('/products')) as any
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

const Products = ({ products }: Props) => {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const router = useRouter()

  const handleDelete = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      setIsDeletingProduct(true)
      await api.delete(`/products/${productId}`)
      router.push('/dashboard/products')
    } catch (error) {
      console.log(error)
    }
    setIsDeletingProduct(false)
  }

  return (
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>In Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div
                        className="product__image"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      ></div>
                    </td>
                    <td>{product.name}</td>
                    <td>
                      ${((1 - product.discount) * product.price).toFixed(2)}
                    </td>
                    <td>
                      {product.discount ? `${product.discount * 100}%` : '--'}
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <Link
                        href={`/dashboard/products/${product._id}`}
                        passHref
                      >
                        <ButtonSmall color="#3f51b5">View</ButtonSmall>
                      </Link>
                      <Link
                        href={`/dashboard/products/${product._id}/edit`}
                        passHref
                      >
                        <ButtonSmall color="#9c27b0">Edit</ButtonSmall>
                      </Link>
                      <ButtonSmall
                        color="#f44336"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </ButtonSmall>
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
}

export default Products
