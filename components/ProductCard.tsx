import styled from 'styled-components'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1542345307-d87fd97e0ed5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1570485071395-29b575ea3b4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1517518295033-d5ab8ca078cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
]

type Props = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  quantity,
  image = DEFAULT_IMAGES[Math.floor(Math.random() * 3)],
}) => (
  <ProductContainer>
    <ProductImg img={image} />
    <ProductBody>
      <ProductTitle>{name}</ProductTitle>
      <ProductPrice>${price}</ProductPrice>
      Quantity: {quantity}
    </ProductBody>
  </ProductContainer>
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
  background-image: url(${(props: any) => props.img});
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
