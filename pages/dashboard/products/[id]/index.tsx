import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import api, { setToken } from '@/api'
import { Product } from '@/models'
import Head from '@/components/Head'
import { Button } from '@/components/Button'
import Back from '@/components/Back'
import Rating from '@/components/Rating'
import { useState } from 'react'
import { getRating } from '@/utils/'

const getProduct = async (id: string) => {
  const { data } = (await api.get(`/products/${id}`)) as any
  return data.product
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = params
  const product: Product = await getProduct(id)
  return { props: { product } }
}

type Props = { product: Product }

const ProductPage = ({ product }: Props) => {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      setIsDeletingProduct(true)
      await api.delete(`/products/${product._id}`)
      router.push('/dashboard/products/')
    } catch (error) {
      console.log(error)
    }
    setIsDeletingProduct(false)
  }

  const { rating, totalRatings } = getRating(product.rating)

  return (
    <div className="product page">
      <Head title={product.name ?? 'Product'} />
      <div className="container" style={{ maxWidth: 1024 }}>
        <Back page="Products" />
        <ProductContainer>
          <ProductImage img={product.image} />
          <div>
            <h1>{product.name}</h1>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>
              {product.discount === 0 && <>${product.price}</>}
              {product.discount > 0 && (
                <>
                  <span
                    style={{ marginRight: 12, textDecoration: 'line-through' }}
                  >
                    ${product.price}
                  </span>
                  ${(product.price * (1 - product.discount)).toFixed(2)}
                </>
              )}
            </ProductPrice>
            <Rating rating={rating} totalRatings={totalRatings} />
            <div className="btn-group">
              <Link href={`/dashboard/products/${product._id}/edit`} passHref>
                <Button color="#3f51b5">Edit</Button>
              </Link>
              <Button
                color="#f44336"
                onClick={handleDelete}
                disabled={isDeletingProduct}
              >
                {isDeletingProduct ? 'Deleting..' : 'Delete'}
              </Button>
            </div>
          </div>
        </ProductContainer>
      </div>
    </div>
  )
}

export default ProductPage

const ProductContainer = styled.div`
  display: flex;
`

const ProductPrice = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  span {
    font: inherit;
    color: #ff5722;
  }
`

const ProductImage = styled.div`
  width: 440px;
  max-width: 100%;
  height: 440px;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
  background-image: url('${(props: { img: string }) => props.img}');
  flex-shrink: 0;
  margin-right: 44px;
`

const ProductDescription = styled.p`
  font-size: 16px;
  margin: 12px 0;
`
