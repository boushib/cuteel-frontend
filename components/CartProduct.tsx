import { useContext } from 'react'
import styled from 'styled-components'
import { CartState, Product } from '@/models'
import { CartContext } from '@/store/providers'
import { CartAT } from '@/store/actions'
import Remove from '@/icons/Remove'

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
      <RemoveIcon className="remove-icon" onClick={removeFromCart}>
        <Remove />
      </RemoveIcon>
    </CartProductContainer>
  )
}

export default CartProduct

const RemoveIcon = styled.div`
  height: 22px;
  width: 0;
  cursor: pointer;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  svg {
    height: 22px;
    width: 22px;
    flex-shrink: 0;
  }
`

const CartProductContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 12px 24px 12px 12px;
  border-radius: 6px;
  &:hover {
    .remove-icon {
      opacity: 1;
      width: 22px;
      margin-left: 16px;
    }
  }
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
  background-color: #f5f6f7;
  color: #999;
`
const CartProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 36px;
  margin-left: auto;
  user-select: none;
  span {
    font-size: 18px;
    font-weight: 500;
    color: #999;
    background-color: #fafafa;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
`
