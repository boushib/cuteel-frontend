import styled from 'styled-components'
import Remove from '../icons/Remove'
import { Product } from '../models'

type Props = {
  product: Product
  quantity: number
}

const CartProduct: React.FC<Props> = ({ product, quantity }) => {
  const { image, name, price } = product

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1)
  }
  const decrementQuantity = () => {
    if (quantity === 0) return
    handleQuantityChange(quantity - 1)
  }

  const handleQuantityChange = (q: number) => {
    console.log('quantity changed: ', q)
  }
  return (
    <CartProductContainer>
      <CartProductImage img={image} />
      <CartProductName>{name}</CartProductName>
      <CartProductQuantityContainer>
        <span onClick={decrementQuantity}>-</span>
        <CartProductQuantity>{quantity}</CartProductQuantity>
        <span onClick={incrementQuantity}>+</span>
      </CartProductQuantityContainer>
      <CartProductPrice>${price.toFixed()}</CartProductPrice>
      <RemoveIcon>
        <Remove />
      </RemoveIcon>
    </CartProductContainer>
  )
}

export default CartProduct

const RemoveIcon = styled.div`
  height: 24px;
  cursor: pointer;
  margin-left: 32px;
  svg {
    height: 24px;
    width: 24px;
  }
`

const CartProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const CartProductName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
`

const CartProductQuantity = styled.div`
  font-size: 15px;
  margin: 0 16px;
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 3px 10px #ddd;
  color: #888;
`
const CartProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 36px;
  user-select: none;
  span {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
`

const CartProductPrice = styled.div`
  font-size: 22px;
  font-weight: bold;
`

const CartProductImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 32px;
  background-size: cover;
  background-position: center;
  background-image: url('${(props: { img: string }) => props.img}');
`
