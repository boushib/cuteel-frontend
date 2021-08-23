import styled from 'styled-components'
import Link from 'next/link'
import { Button } from './Button'
import { useContext } from 'react'
import { CartContext } from '../store/providers'
import { CartAT } from '../store/actions'
import { Product } from '../models'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { dispatch } = useContext(CartContext) as { dispatch: Function }
  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    dispatch({ type: CartAT.ADD, payload: product })
  }
  const { _id, image, name, price, quantity } = product
  return (
    <Link href={`/products/${_id}`} passHref={true}>
      <ProductContainer>
        <ProductImg img={image} />
        <ProductBody>
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>${price.toFixed(2)}</ProductPrice>
          <ProductQuantity>{quantity} in stock</ProductQuantity>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </ProductBody>
      </ProductContainer>
    </Link>
  )
}

export default ProductCard

const ProductContainer = styled.div`
  width: 320px;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
`

const ProductImg = styled.div`
  width: 100%;
  border-radius: 4px 4px 0 0;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props: { img: string }) => props.img});
`

const ProductBody = styled.div`
  padding: 16px 20px;
`

const ProductTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4px;
`

const ProductQuantity = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
`

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #89b24a;
`
