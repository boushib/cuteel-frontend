import { Button } from '@/components/Button'
import CheckoutAddress from '@/components/CheckoutAddress'
import CheckoutPayment from '@/components/CheckoutPayment'
import OrderSummary from '@/components/OrderSummary'
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
        {currentStep === 1 && <CheckoutAddress onProceed={handleProceed} />}
        {currentStep === 2 && <CheckoutPayment onProceed={handleProceed} />}
        {currentStep === 3 && <OrderSummary onProceed={handleProceed} />}
        {currentStep > 3 && <CheckoutDone />}
      </div>
    </div>
  )
}

const CheckoutDone = () => (
  <div className="card checkout__done">
    Congratulations! Your order is placed successfully!
  </div>
)

export default Checkout
