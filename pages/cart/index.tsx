import { useContext } from 'react'
import { CartState } from '../../models'
import { CartContext } from '../../store'
import styled from 'styled-components'
import CartProduct from '../../components/CartProduct'
import { Button } from '../../components/Button'

const Cart = () => {
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { items, total } = cartState

  const handleCheckout = () => {
    console.log('checkout..')
  }

  if (!items) return

  return (
    <div className="cart page">
      <div className="container">
        <h1>Cart</h1>
        {items.length === 0 && 'Your Cart is empty!'}
        {items.length > 0 && (
          <>
            {items.map((item) => (
              <CartProduct
                product={item.product}
                quantity={item.quantity}
                key={item.product._id}
              />
            ))}
            <Total>Total: ${total}</Total>
            <Button onClick={handleCheckout}>Checkout</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

const Total = styled.div`
  font-size: 18px;
  margin: 20px 0;
  color: #999;
`
