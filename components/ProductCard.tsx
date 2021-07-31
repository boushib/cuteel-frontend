import styled from 'styled-components'
import Link from 'next/link'

type Props = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const ProductCard: React.FC<Props> = ({ id, name, price, quantity, image }) => (
  <Link href={`/products/${id}`} passHref={true}>
    <ProductContainer>
      <ProductImg img={image} />
      <ProductBody>
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>${price}</ProductPrice>
        Quantity: {quantity}
      </ProductBody>
    </ProductContainer>
  </Link>
)

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

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #89b24a;
`
