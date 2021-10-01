import { useState } from 'react'
import { useRouter } from 'next/router'
import api, { setToken } from '@/api'
import { Order } from '@/models'
import Head from '@/components/Head'
import Back from '@/components/Back'

const getOrder = async (id: string) => {
  const { data } = await api.get(`/orders/${id}`)
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
    <div className="order page">
      <Head title={'Order ' + order.orderNumber} />
      <div className="container" style={{ maxWidth: 1024 }}>
        <Back page="Orders" />
        <p>Order number: {order.orderNumber}</p>
      </div>
    </div>
  )
}

export default OrderPage
