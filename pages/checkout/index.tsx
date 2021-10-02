import Checkmark from '@/icons/Checkmark'
import { useState } from 'react'

const STEPS = [
  'Order details',
  'Shipping address',
  'Payment method',
  'Place order',
]

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <div className="order page">
      <div className="container">
        <h1>Checkout</h1>
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
      </div>
    </div>
  )
}

export default Checkout
