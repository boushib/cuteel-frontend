import { Elements } from '@stripe/react-stripe-js'
import CheckoutAddress from '@/components/CheckoutAddress'
import CheckoutPayment from '@/components/CheckoutPayment'
import Head from '@/components/Head'
import OrderSummary from '@/components/OrderSummary'
import Checkmark from '@/icons/Checkmark'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { ORDER } from '@/constants/dummy'

const STEPS = ['Order details', 'Shipping address', 'Summary', 'Payment method']

const Checkout = () => {
  // TODO - Revert this!
  // const [currentStep, setCurrentStep] = useState(1)
  const [currentStep, setCurrentStep] = useState(2)
  const handleProceed = () => {
    setCurrentStep((s) => s + 1)
  }
  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

  return (
    <>
      <Head title="Checkout" />
      <Elements stripe={stripe}>
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
            {currentStep === 2 && (
              <OrderSummary order={ORDER} onProceed={handleProceed} />
            )}
            {currentStep === 3 && (
              <CheckoutPayment
                amount={ORDER.total * 100}
                onProceed={handleProceed}
              />
            )}
            {currentStep > 4 && <CheckoutDone />}
          </div>
        </div>
      </Elements>
    </>
  )
}

const CheckoutDone = () => (
  <div className="card checkout__done">
    Congratulations! Your order is placed successfully!
  </div>
)

export default Checkout
