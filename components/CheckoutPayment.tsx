import { CartAT } from '@/store/actions'
import { CartContext } from '@/store/providers'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import api, { setToken } from '../api'
import { CreatedOrder } from '../models'
import { Button } from './Button'

type Props = {
  order: CreatedOrder
  onProceed: () => void
}

type BillingDetails = {
  name: string
  email: string
  address: {
    city: string
    line1: string
    state: string
    postal_code: string
  }
}

const CheckoutPayment = ({ order, onProceed }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: '',
    email: '',
    address: {
      city: '',
      line1: '',
      state: '',
      postal_code: '',
    },
  })

  const { dispatch: cartDispatch } = useContext(CartContext) as {
    dispatch: Function
  }

  useEffect(() => {
    console.log({ order })
    const {
      name,
      email,
      city,
      address: line1,
      state,
      postalCode: postal_code,
    } = order.shipping
    setBillingDetails({
      name,
      email,
      address: { city, line1, state, postal_code },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stripe = useStripe()
  const elements = useElements()

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name' || name === 'email') {
      setBillingDetails((s) => ({ ...s, [name]: value }))
    } else {
      setBillingDetails((s) => ({
        ...s,
        address: { ...s.address, [name]: value },
      }))
    }
  }

  const handleCardDetailsChange = (e: any) => {
    console.log(e.error?.message)
  }

  const handleSubmit = async () => {
    if (!(stripe && elements)) return

    setIsProcessing(true)
    const card = elements.getElement('card')
    if (!card) return

    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      const { data } = (await api.post('/payment/create', {
        amount: Math.round(order.total * 100),
      })) as any
      const { clientSecret } = data
      const billing_details = { ...billingDetails }
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details,
      })

      if (paymentMethodReq.error) {
        throw new Error(paymentMethodReq.error.message)
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })

      if (error) {
        throw new Error(error.message)
      }
      await api.post('/orders/create', { ...order })
      localStorage.removeItem('cart')
      cartDispatch({ type: CartAT.SET, payload: { items: [], total: 0 } })

      onProceed()
    } catch (error: any) {
      console.log('Payment error: ', error.message)
    }

    setIsProcessing(false)
  }

  return (
    <div
      className="checkout__payment"
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      <h3>Payment</h3>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          onChange={handleFieldChange}
          value={billingDetails.name}
        />
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleFieldChange}
          value={billingDetails.email}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="line1"
          className="form-control"
          placeholder="Address"
          onChange={handleFieldChange}
          value={billingDetails.address.line1}
        />
        <input
          type="text"
          name="city"
          className="form-control"
          placeholder="City"
          onChange={handleFieldChange}
          value={billingDetails.address.city}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="state"
          className="form-control"
          placeholder="State"
          onChange={handleFieldChange}
          value={billingDetails.address.state}
        />
        <input
          type="text"
          name="postal_code"
          className="form-control"
          placeholder="Postal Code"
          onChange={handleFieldChange}
          value={billingDetails.address.postal_code}
        />
      </div>

      <div className="stripe__wrapper">
        <CardElement
          options={{
            // iconStyle: 'solid',
            style: {
              base: {
                color: '#666',
                fontSize: '16px',
                fontWeight: 300,
                iconColor: '#aaa',
                '::placeholder': {
                  color: '#aaa',
                },
              },
              invalid: {
                iconColor: '#ff5722',
                color: '#ff5722',
              },
              complete: {
                iconColor: '#89b24a',
              },
            },
            hidePostalCode: true,
          }}
          onChange={handleCardDetailsChange}
        />
      </div>
      <Button
        disabled={!stripe}
        onClick={handleSubmit}
        type="submit"
        style={{ marginBottom: 0, width: 200 }}
      >
        {isProcessing ? 'Processing...' : `Pay $${order.total}`}
      </Button>
    </div>
  )
}

export default CheckoutPayment
