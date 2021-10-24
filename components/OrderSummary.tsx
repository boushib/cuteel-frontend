import { Order } from '../models'
import { Button } from './Button'

type Props = { order: Order; onProceed: () => void }

const OrderSummary = ({ order, onProceed }: Props) => {
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
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={`item-${index}`}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Button onClick={onProceed}>Confirm</Button>
    </div>
  )
}

export default OrderSummary
