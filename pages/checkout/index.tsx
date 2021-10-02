import { Button } from '@/components/Button'
import Checkmark from '@/icons/Checkmark'
import { useState } from 'react'
import styles from './index.module.sass'

const STEPS = [
  'Order details',
  'Shipping address',
  'Payment method',
  'Place order',
]

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const handleProceed = () => {
    setCurrentStep((s) => s + 1)
  }
  return (
    <div className="order page">
      <div className="container">
        <div className="form__steps">
          {STEPS.map((s, i) => (
            <div
              className={`form__step${currentStep === i ? ' current' : ''}${
                currentStep > i ? ' done' : ''
              }`}
              key={`s-${i}`}
            >
              <div className="form__step__number">
                {currentStep <= i && i + 1}
                {currentStep > i && <Checkmark />}
              </div>
              <div className="form__step__name">{s}</div>
            </div>
          ))}
        </div>
        {currentStep === 1 && (
          <CheckoutShippingAddress onProceed={handleProceed} />
        )}
        {currentStep === 2 && (
          <CheckoutPaymentMethod onProceed={handleProceed} />
        )}
        {currentStep === 3 && <CheckoutPlaceOrder onProceed={handleProceed} />}
        {currentStep > 3 && <CheckoutDone />}
      </div>
    </div>
  )
}

type CheckoutShippingAddressProps = {
  onProceed: () => void
}

const CheckoutShippingAddress = ({
  onProceed,
}: CheckoutShippingAddressProps) => (
  <div className="checkout__shippingAddress">
    <h2>Shipping Address</h2>
    <Button onClick={onProceed}>Next</Button>
  </div>
)

type CheckoutPaymentMethodProps = {
  onProceed: () => void
}

const CheckoutPaymentMethod = ({ onProceed }: CheckoutPaymentMethodProps) => (
  <div className="checkout__paymentMethod">
    <h2>Payment Method</h2>
    <Button onClick={onProceed}>Next</Button>
  </div>
)

type CheckoutPlaceOrderProps = {
  onProceed: () => void
}

const CheckoutPlaceOrder = ({ onProceed }: CheckoutPlaceOrderProps) => (
  <div className="checkout__placeOrder">
    <h2>Place Order</h2>
    <Button onClick={onProceed}>Submit</Button>
  </div>
)

const CheckoutDone = () => (
  <div className="checkout__placeOrder">
    <h3>Congratulations! Your order is placed successfully!</h3>
  </div>
)

export default Checkout
