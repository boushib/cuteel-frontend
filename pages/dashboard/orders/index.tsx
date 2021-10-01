import Head from '@/components/Head'
import api, { setToken } from '@/api'
import { ButtonSmall } from '@/components/Button'
import { Order } from '@/models/'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { formatTime } from '@/utils/'

const getOrders = async () => {
  try {
    const { data } = await api.get('/orders')
    return data.orders
  } catch (error: any) {
    console.log(error.response)
    return []
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  const orders: Array<Order> = await getOrders()
  return { props: { orders } }
}

type Props = { orders: Array<Order> }

const Orders: React.FC<Props> = ({ orders }) => {
  const [isDeletingCategory, setIsDeletingCategory] = useState(false)
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('')
  const router = useRouter()

  // const handleDelete = async (categoryId: string) => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     setToken(`${token}`)
  //     setIsDeletingCategory(true)
  //     setCategoryIdToDelete(categoryId)
  //     await api.delete(`/categories/${categoryId}`)
  //     router.push('/dashboard/categories')
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsDeletingCategory(false)
  // }
  return (
    <>
      <Head title="Orders" />
      <div className="orders">
        <h2>Orders</h2>
        {orders.length > 0 && (
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Created at</th>
                  <th>Invoice</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{formatTime(order.createdAt)}</td>
                    <td>
                      <a href={order.invoice} target="_blank" rel="noreferrer">
                        <ButtonSmall color="#3f51b5">View Invoice</ButtonSmall>
                      </a>
                    </td>
                    <td>
                      <ButtonSmall>Approve</ButtonSmall>
                      <ButtonSmall color="#f44336">Delete</ButtonSmall>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
