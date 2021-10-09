import styled from 'styled-components'
import Mastercard from '@/icons/Mastercard'
import Visa from '@/icons/Visa'
import Amex from '@/icons/Amex'
import { ChangeEvent, useState } from 'react'
import Skrill from '@/icons/Skrill'
import Discover from '@/icons/Discover'
import Maestro from '@/icons/Maestro'
import { Button } from './Button'

type Props = { onProceed: () => void }

const CheckoutPayment = ({ onProceed }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState('master-card')
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  })

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((p) => ({ ...p, [name]: value }))
  }

  const handleProceed = () => {
    // TODO: Form validation
    console.log(paymentInfo)
    onProceed()
  }

  return (
    <div
      className="checkout__payment"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
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
            value="skrill"
            checked={paymentMethod === 'skrill'}
            onChange={() => setPaymentMethod('skrill')}
          />
          <Skrill />
        </PaymentMethod>
        <PaymentMethod>
          <input
            type="radio"
            name="payment-method"
            value="discover"
            checked={paymentMethod === 'discover'}
            onChange={() => setPaymentMethod('discover')}
          />
          <Discover />
        </PaymentMethod>
        <PaymentMethod>
          <input
            type="radio"
            name="payment-method"
            value="maestro"
            checked={paymentMethod === 'maestro'}
            onChange={() => setPaymentMethod('maestro')}
          />
          <Maestro />
        </PaymentMethod>
      </PaymentMethods>
      <div className="form-group">
        <div>
          <label htmlFor="">Name on Card</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="John Doe"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">Card number</label>
          <input
            type="text"
            name="cardNumber"
            className="form-control"
            placeholder="1111 2222 3333 4444"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="">Expiration date</label>
          <input
            type="text"
            name="expirationDate"
            className="form-control"
            placeholder="10/2022"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">CVV</label>
          <input
            type="text"
            name="cvv"
            className="form-control"
            placeholder="123"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  )
}

const PaymentMethods = styled.div`
  display: flex;
  margin-bottom: 24px;
  & > div {
    margin-right: 12px;
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

export default CheckoutPayment
