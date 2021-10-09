import { ORDER } from '@/constants/dummy'
import { formatDate } from '../utils'
import { Button } from './Button'

type Props = { onProceed: () => void }

const OrderSummary = ({ onProceed }: Props) => {
  const handleProceed = () => {
    onProceed()
  }

  const order = ORDER

  return (
    <div
      className="checkout__address"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <h3>Summary</h3>
      <div className="order__details" style={{ marginBottom: 32 }}>
        <div className="card">
          <p>
            <b>Order number:</b> {order.orderNumber}
          </p>
          <p>
            <b>Date:</b> {formatDate(order.billingDate)}
          </p>
        </div>
      </div>
      <h3>Items</h3>
      <div className="card" style={{ marginBottom: 24 }}>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={`item-${index}`}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  )
}

export default OrderSummary
