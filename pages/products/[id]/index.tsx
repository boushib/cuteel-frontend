import styled from 'styled-components'
import api from '@/api'
import { useContext } from 'react'
import { CartContext, WishlistContext } from '@/store/providers'
import { Product } from '@/models'
import { CartAT, WishlistAT } from '@/store/actions'
import Head from '@/components/Head'
import { Button } from '@/components/Button'
import Back from '@/components/Back'
import Rating from '@/components/Rating'

const getProduct = async (id: string) => {
  const { data } = await api.get(`/products/${id}`)
  return data.product
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = params
  const product: Product = await getProduct(id)
  return { props: { product } }
}

type Props = { product: Product }

const ProductPage: React.FC<Props> = ({ product }) => {
  const { dispatch: cartDispatch } = useContext(CartContext) as {
    dispatch: Function
  }
  const { dispatch: wishlistDispatch } = useContext(WishlistContext) as {
    dispatch: Function
  }

  const handleAddToCart = () => {
    cartDispatch({ type: CartAT.ADD, payload: product })
  }

  const handleAddToWishlist = () => {
    wishlistDispatch({ type: WishlistAT.ADD, payload: product })
  }

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
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <Rating />
            <div className="btn-group">
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              <Button color="#3f51b5" onClick={handleAddToWishlist}>
                Add to Wishlist
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
