import { Elements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { AuthContext } from '@/store/providers'
import { AuthState, CartState } from '@/models/'
import { CreatedOrder } from '@/models/orders'
import Head from '@/components/Head'
import CheckoutPayment from '@/components/CheckoutPayment'
import CheckoutAddress from '@/components/CheckoutAddress'
import OrderSummary from '@/components/OrderSummary'
import Checkmark from '@/icons/Checkmark'
import { Button } from '@/components/Button'
import router from 'next/router'

const STEPS = ['Order details', 'Shipping address', 'Summary', 'Payment method']

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const date = new Date().toISOString()

  const [order, setOrder] = useState<CreatedOrder>({
    shipping: {
      email: '',
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    userId: '',
    items: [],
    currency: '$',
    subtotal: 0,
    total: 0,
    billingDate: date,
    dueDate: date,
  })

  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (!storedCart) return
    const cart: CartState = JSON.parse(storedCart)
    const { total, items: cartItems } = cart
    const subtotal = total // TODO: calculate accurate value
    const items = cartItems.map((item) => {
      const { product, quantity } = item
      const { _id: productId, name, description, price } = product
      return {
        productId,
        tax: 0,
        name: name,
        description: description,
        quantity: quantity,
        price: price,
      }
    })
    setOrder((s) => ({ ...s, items, total, subtotal }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      setOrder((s) => ({ ...s, userId: user._id }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) {
    router.push('/login')
    return null
  }

  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

  const handleProceed = () => {
    setCurrentStep((s) => s + 1)
  }

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
            {currentStep === 1 && (
              <CheckoutAddress
                onProceed={(shipping) => {
                  setOrder((s) => ({ ...s, shipping }))
                  handleProceed()
                }}
              />
            )}
            {currentStep === 2 && (
              <OrderSummary order={order} onProceed={handleProceed} />
            )}
            {currentStep === 3 && (
              <CheckoutPayment order={order} onProceed={handleProceed} />
            )}
            {currentStep >= 4 && <CheckoutDone />}
          </div>
        </div>
      </Elements>
    </>
  )
}

const CheckoutDone = () => (
  <div className="checkout__done">
    <p style={{ marginBottom: 24 }}>
      Congratulations! Your order is placed successfully!
    </p>
    <Link href="/catalog" passHref>
      <Button>Back to products page</Button>
    </Link>
  </div>
)

export default Checkout
