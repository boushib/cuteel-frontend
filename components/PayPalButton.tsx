import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

console.log({ ppId: process.env.PAYPAL_CLIENT_ID })

const PayPalButton = () => (
  <PayPalScriptProvider
    options={{ 'client-id': process.env.PAYPAL_CLIENT_ID! }}
  >
    {process.env.PAYPAL_CLIENT_ID}
    <PayPalButtons />
  </PayPalScriptProvider>
)

export default PayPalButton
