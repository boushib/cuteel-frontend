import styled from 'styled-components'

type Props = {
  id: string
  name: string
  price: number
}

const CartProduct: React.FC<Props> = ({ id, name, price }) => (
  <CartProductContainer>
    <CartProductName>{name}</CartProductName>
    <CartProductPrice>${price}</CartProductPrice>
  </CartProductContainer>
)

export default CartProduct

const CartProductContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
`

const CartProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 12px;
`

const CartProductPrice = styled.div`
  font-size: 20px;
`
