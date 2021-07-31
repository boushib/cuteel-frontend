import { useContext } from 'react'
import { CartState } from '../../models'
import { CartContext } from '../../store'
import styled from 'styled-components'
import CartProduct from '../../components/CartProduct'
import { Button } from '../../components/Button'

const Cart = () => {
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { products, total } = cartState

  const handleCheckout = () => {
    console.log('checkout..')
  }

  return (
    <div className="cart page">
      <div className="container">
        <h1>Cart Page</h1>
        <Total>Total: ${total}</Total>
        {products.map((p) => (
          <CartProduct id={p._id} name={p.name} price={p.price} key={p._id} />
        ))}
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  )
}

export default Cart

const Total = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 16px;
`
