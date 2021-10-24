import { Elements as StripeElements } from '@stripe/react-stripe-js'
import CheckoutAddress from '@/components/CheckoutAddress'
import CheckoutPayment from '@/components/CheckoutPayment'
import Head from '@/components/Head'
import OrderSummary from '@/components/OrderSummary'
import Checkmark from '@/icons/Checkmark'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const STEPS = [
  'Order details',
  'Shipping address',
  // 'Payment method',
  'Place order',
]

const Checkout = () => {
  // TODO - Revert this!
  // const [currentStep, setCurrentStep] = useState(1)
  const [currentStep, setCurrentStep] = useState(2)
  const handleProceed = () => {
    setCurrentStep((s) => s + 1)
  }
  const stripe = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`)

  return (
    <>
      <Head title="Checkout" />
      <StripeElements stripe={stripe}>
        <div className="order page">
          <div className="container">
            <div className="form__steps">
              {STEPS.map((s, i) => (
                <div
                  className={`form__step${currentStep === i ? ' current' : ''}${
                    currentStep > i ? ' done' : ''
                  }`}
                  style={{ width: `${100 / STEPS.length}%` }}
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
            {/* {currentStep === 2 && <CheckoutPayment onProceed={handleProceed} />} */}
            {currentStep === 2 && <OrderSummary onProceed={handleProceed} />}
            {currentStep > 3 && <CheckoutDone />}
          </div>
        </div>
      </StripeElements>
    </>
  )
}

const CheckoutDone = () => (
  <div className="card checkout__done">
    Congratulations! Your order is placed successfully!
  </div>
)

export default Checkout
