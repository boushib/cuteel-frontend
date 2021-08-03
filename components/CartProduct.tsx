import styled from 'styled-components'
import Remove from '../icons/Remove'
import { useContext } from 'react'
import { CartState, Product } from '../models'
import { CartContext } from '../store'
import { CartAT } from '../store/actions'

type Props = { product: Product; quantity: number }

const CartProduct: React.FC<Props> = ({ product, quantity }) => {
  const { dispatch, state: cartState } = useContext(CartContext) as {
    dispatch: Function
    state: CartState
  }
  const { image, name, price, _id } = product

  const removeFromCart = () => {
    dispatch({ type: CartAT.REMOVE, payload: _id })
  }

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1)
  }
  const decrementQuantity = () => {
    if (quantity === 1) return
    handleQuantityChange(quantity - 1)
  }

  const handleQuantityChange = (q: number) => {
    const items = [...cartState.items]
    let total = 0
    const index = items.findIndex((i) => i.product._id === _id)
    items[index].quantity = q
    items.forEach((i) => (total += i.product.price * i.quantity))
    dispatch({ type: CartAT.SET, payload: { items, total } })
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
      <RemoveIcon onClick={removeFromCart}>
        <Remove />
      </RemoveIcon>
    </CartProductContainer>
  )
}

export default CartProduct

const RemoveIcon = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-left: 32px;
  svg {
    height: 100%;
    width: 100%;
  }
`

const CartProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const CartProductImage = styled.div`
  width: 64px;
  height: 64px;
  margin-right: 32px;
  background-size: cover;
  background-position: center;
  background-image: url('${(props: { img: string }) => props.img}');
`

const CartProductName = styled.h3`
  font-size: 17px;
  font-weight: 400;
  color: #888;
  margin: 0;
`

const CartProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const CartProductQuantity = styled.div`
  font-size: 15px;
  margin: 0 12px;
  height: 32px;
  width: 32px;
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
    font-size: 18px;
    font-weight: 700;
    color: #888;
    cursor: pointer;
  }
`