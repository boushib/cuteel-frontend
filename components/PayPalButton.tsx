import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { PAYPAL_CLIENT_ID } from '@/constants'

const PayPalButton = () => (
  <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
    <PayPalButtons />
  </PayPalScriptProvider>
)

export default PayPalButton
