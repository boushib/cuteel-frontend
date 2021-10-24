import { ORDER } from '@/constants/dummy'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ChangeEvent, useState } from 'react'
import api, { setToken } from '../api'
import { Button } from './Button'

type Props = { onProceed: () => void }

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

const OrderSummary = ({ onProceed }: Props) => {
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

  const order = ORDER

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
    console.log(billingDetails)
    // TODO - validate form fields

    if (!(stripe && elements)) return

    setIsProcessing(true)
    const card = elements.getElement('card')
    if (!card) return

    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      const { data } = await api.post('/payment/create', {
        amount: order.total,
      })
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
      console.log('Done!!')
      // onSuccessfulCheckout()
    } catch (error: any) {
      console.log('Payment error: ', error.message)
    }

    setIsProcessing(false)
  }

  return (
    <div
      className="checkout__summary"
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      <h3>Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            {/* <th>Description</th> */}
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={`item-${index}`}>
              <td>{item.name}</td>
              {/* <td>{item.description}</td> */}
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h3>Payment</h3>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          onChange={handleFieldChange}
        />
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="line1"
          className="form-control"
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          className="form-control"
          placeholder="City"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="state"
          className="form-control"
          placeholder="State"
        />
        <input
          type="text"
          name="postal_code"
          className="form-control"
          placeholder="Postal Code"
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
        {isProcessing ? 'Processing...' : `Pay $${ORDER.total}`}
      </Button>
    </div>
  )
}

export default OrderSummary
