import { ORDER } from '@/constants/dummy'
import { Button } from './Button'

type Props = { onProceed: () => void }

const OrderSummary = ({ onProceed }: Props) => {
  const handleProceed = () => {
    onProceed()
  }

  const order = ORDER

  return (
    <div
      className="checkout__summary"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <h3>Summary</h3>
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
