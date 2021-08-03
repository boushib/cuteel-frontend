import { useContext } from 'react'
import { CartState } from '../../models'
import { CartContext } from '../../store'
import styled from 'styled-components'
import CartProduct from '../../components/CartProduct'
import { Button } from '../../components/Button'

import Mastercard from '../../icons/Mastercard'
import Visa from '../../icons/Visa'
import Amex from '../../icons/Amex'
import PayPal from '../../icons/PayPal'

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
        {items.length === 0 && 'Your Cart is empty!'}
        {items.length > 0 && (
          <CartGrid>
            <div className="cart__products">
              <h2>Cart</h2>
              {items.map((item) => (
                <CartProduct
                  product={item.product}
                  quantity={item.quantity}
                  key={item.product._id}
                />
              ))}
            </div>
            <aside>
              <h2>Payment details</h2>
              <label htmlFor="">Payment type</label>
              <PaymentMethods>
                <PaymentMethod>
                  <input
                    type="radio"
                    name="payment-method"
                    value="master-card"
                  />
                  <Mastercard />
                </PaymentMethod>
                <PaymentMethod>
                  <input type="radio" name="payment-method" value="visa" />
                  <Visa />
                </PaymentMethod>
                <PaymentMethod>
                  <input
                    type="radio"
                    name="payment-method"
                    value="american-express"
                  />
                  <Amex />
                </PaymentMethod>
                <PaymentMethod>
                  <input type="radio" name="payment-method" value="paypal" />
                  <PayPal />
                </PaymentMethod>
              </PaymentMethods>
              <label htmlFor="">Name on Card</label>
              <input
                type="text"
                name=""
                className="form-control"
                placeholder="John Doe"
              />
              <label htmlFor="">Card number</label>
              <input
                type="text"
                name=""
                className="form-control"
                placeholder="1111 2222 3333 4444"
              />
              <label htmlFor="">Expiration date</label>
              <input
                type="text"
                name=""
                className="form-control"
                placeholder="10/2022"
              />
              <label htmlFor="">CVV</label>
              <input
                type="text"
                name=""
                className="form-control"
                placeholder="123"
              />
              <Amount>
                <span>Subtotal</span>
                <span>$3000.000</span>
              </Amount>
              <Amount>
                <span>Shipping</span>
                <span>$20.00</span>
              </Amount>
              <Amount>
                <span>Total(Tax incl.)</span>
                <span>$3820.00</span>
              </Amount>
              <br />
              <Button>Checkout</Button>
            </aside>
          </CartGrid>
        )}
      </div>
    </div>
  )
}

export default Cart

const CartGrid = styled.div`
  display: flex;
  justify-content: space-between;
  aside {
    width: 320px;
  }
`

const PaymentMethods = styled.div`
  display: flex;
  margin-bottom: 24px;
  & > div {
    margin-right: 12px;
  }
`

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  span {
    font-size: 15px;
    color: #999;
    &:last-child {
      font-weight: bold;
    }
  }
`

const PaymentMethod = styled.div`
  position: relative;
  height: 32px;
  width: 44px;
  svg {
    width: 100%;
    height: 100%;
    opacity: 0.6;
    transition: opacity 0.3s ease-in-out;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
    &:checked + svg {
      opacity: 1;
    }
  }
`

const Total = styled.div`
  font-size: 18px;
  margin: 20px 0;
  color: #999;
`
