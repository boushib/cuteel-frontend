import api, { setToken } from '@/api'
import { Order } from '@/models'
import Head from '@/components/Head'
import Back from '@/components/Back'
import { formatDate } from '@/utils/'
import styles from './order.module.sass'

const getOrder = async (id: string) => {
  const { data } = (await api.get(`/orders/${id}`)) as any
  return data.order
}

export const getServerSideProps = async ({ req, params }: any) => {
  setToken(req.cookies['token'])
  const { id } = params
  const order: Order = await getOrder(id)
  return { props: { order } }
}

type Props = { order: Order }

const OrderPage = ({ order }: Props) => {
  // const [isDeletingOrder, setIsDeletingOrder] = useState(false)
  // const router = useRouter()

  // const handleDelete = async () => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     setToken(`${token}`)
  //     setIsDeletingOrder(true)
  //     await api.delete(`/orders/${order._id}`)
  //     router.push('/dashboard/orders/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsDeletingOrder(false)
  // }

  return (
    <div className="order">
      <Head title={'Order ' + order._id} />
      <Back page="Orders" />
      <h3>Order details</h3>
      <div className={styles.order__details}>
        <div className="card">
          <p>
            <b>Order Id:</b> {order._id}
          </p>
          <p>
            <b>Date:</b> {formatDate(order.billingDate)}
          </p>
          <p>
            <b>Total:</b> ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
      <h3>Items</h3>
      <div className="card">
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
      </div>
    </div>
  )
}

export default OrderPage
