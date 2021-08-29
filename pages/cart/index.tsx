import { ChangeEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { CartState } from '@/models'
import { CartContext } from '@/store/providers'
import Head from '@/components/Head'
import CartProduct from '@/components/CartProduct'
import { Button } from '@/components/Button'
import Mastercard from '@/icons/Mastercard'
import Visa from '@/icons/Visa'
import Amex from '@/icons/Amex'
import PayPal from '@/icons/PayPal'
import PayPalButton from '@/components/PayPalButton'

const Cart = () => {
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const [paymentMethod, setPaymentMethod] = useState('master-card')
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  })
  const { items, total } = cartState

  const SHIPPING_COST = 20

  const handleCheckout = () => {
    console.log('checkout..')
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((p) => ({ ...p, [name]: value }))
  }

  console.log(paymentInfo)

  if (!items) return

  return (
    <>
      <Head title="Cart" />
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
                      checked={paymentMethod === 'master-card'}
                      onChange={() => setPaymentMethod('master-card')}
                    />
                    <Mastercard />
                  </PaymentMethod>
                  <PaymentMethod>
                    <input
                      type="radio"
                      name="payment-method"
                      value="visa"
                      checked={paymentMethod === 'visa'}
                      onChange={() => setPaymentMethod('visa')}
                    />
                    <Visa />
                  </PaymentMethod>
                  <PaymentMethod>
                    <input
                      type="radio"
                      name="payment-method"
                      value="american-express"
                      checked={paymentMethod === 'american-express'}
                      onChange={() => setPaymentMethod('american-express')}
                    />
                    <Amex />
                  </PaymentMethod>
                  <PaymentMethod>
                    <input
                      type="radio"
                      name="payment-method"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <PayPal />
                  </PaymentMethod>
                </PaymentMethods>
                {paymentMethod === 'paypal' && <PayPalButton />}
                {paymentMethod !== 'paypal' && (
                  <>
                    <label htmlFor="">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      onChange={handleFieldChange}
                    />
                    <label htmlFor="">Card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      placeholder="1111 2222 3333 4444"
                      onChange={handleFieldChange}
                    />
                    <label htmlFor="">Expiration date</label>
                    <input
                      type="text"
                      name="expirationDate"
                      className="form-control"
                      placeholder="10/2022"
                      onChange={handleFieldChange}
                    />
                    <label htmlFor="">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      className="form-control"
                      placeholder="123"
                      onChange={handleFieldChange}
                    />
                  </>
                )}
                <Amount>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </Amount>
                <Amount>
                  <span>Shipping</span>
                  <span>${SHIPPING_COST.toFixed(2)}</span>
                </Amount>
                <Amount>
                  <span>Total</span>
                  <span>${(total + SHIPPING_COST).toFixed(2)}</span>
                </Amount>
                <br />
                <Button onClick={handleCheckout}>Checkout</Button>
              </aside>
            </CartGrid>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart

const CartGrid = styled.div`
  display: flex;
  justify-content: space-between;
  aside {
    width: 320px;
  }
  .cart__products {
    flex-grow: 1;
    margin-right: 36px;
    max-width: 720px;
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
