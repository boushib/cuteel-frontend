// import { Line, Bar } from 'react-chartjs-2'
import { Order, Product, User } from '@/models'
import api, { setToken } from '@/api/'
import { GetServerSideProps } from 'next'
import styles from './Overview.module.sass'
import Head from '@/components/Head'
import Shop from '@/icons/Shop'
import UserIcon from '@/icons/User'
import ShoppingCart from '@/icons/ShoppingCart'
import Money from '@/icons/Money'

// const data = {
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [
//     {
//       label: '# of Orders',
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: 'rgb(239, 83, 80)',
//       borderColor: 'rgba(239, 83, 80, 0.2)',
//     },
//   ],
// }

// const options: any = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// }

type GetProducts = () => Promise<any>
const getProducts: GetProducts = async () => api.get('/products')

type GetOrders = () => Promise<Array<Order>>
const getOrders: GetOrders = async () => api.get('/orders')

type GetCustomers = () => Promise<Array<User>>
const getCustomers: GetCustomers = async () => api.get('/customers')

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  let props = { products: [], orders: [], customers: [] }
  try {
    const productsPromise = getProducts()
    const ordersPromise = getOrders()
    const customersPromise = getCustomers()
    const [
      { data: productsData },
      { data: ordersData },
      { data: customersData },
    ]: any = await Promise.all([
      productsPromise,
      ordersPromise,
      customersPromise,
    ])
    const { products } = productsData
    const { orders } = ordersData
    const { users } = customersData
    props = { products, orders, customers: users }
  } catch (error: any) {
    console.log(error.response)
  }
  return { props }
}

type Props = {
  products: Array<Product>
  orders: Array<Order>
  customers: Array<User>
}

const Dashboard = ({ products, orders, customers }: Props) => {
  let sales = 0
  let income = 0

  orders.forEach((order) => {
    sales += order.items.length
    income += order.total
  })

  return (
    <>
      <Head title="Dashboard" />
      <div className="dashboard" style={{ marginTop: 12 }}>
        <div className={styles.overview}>
          <div
            className={`${styles.overview__item} ${styles['overview__item--var1']}`}
          >
            <div className={styles.overview__item__icon}>
              <Shop size={24} />
            </div>
            <div>
              <div className={styles.overview__item__label}>Products</div>
              <div className={styles.overview__item__value}>
                {products.length}
              </div>
            </div>
          </div>
          <div
            className={`${styles.overview__item} ${styles['overview__item--var2']}`}
          >
            <div className={styles.overview__item__icon}>
              <ShoppingCart size={24} />
            </div>
            <div>
              <div className={styles.overview__item__label}>Sales</div>
              <div className={styles.overview__item__value}>{sales}</div>
            </div>
          </div>
          <div
            className={`${styles.overview__item} ${styles['overview__item--var3']}`}
          >
            <div className={styles.overview__item__icon}>
              <Money size={36} />
            </div>
            <div>
              <div className={styles.overview__item__label}>Icome</div>
              <div className={styles.overview__item__value}>
                ${income.toFixed(2)}
              </div>
            </div>
          </div>
          <div
            className={`${styles.overview__item} ${styles['overview__item--var4']}`}
          >
            <div className={styles.overview__item__icon}>
              <UserIcon size={24} />
            </div>
            <div>
              <div className={styles.overview__item__label}>Customers</div>
              <div className={styles.overview__item__value}>
                {customers.length}
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', height: 400 }}>
            <Line data={data} options={options} />
          </div>
          <div style={{ width: '48%', height: 400, marginLeft: '4%' }}>
            <Bar data={data} options={options} />
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Dashboard
