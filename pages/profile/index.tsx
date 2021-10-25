import Link from 'next/link'
import Cookies from 'js-cookie'
import { AuthState, Order, User } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { useContext } from 'react'
import { AuthContext } from '@/store/providers'
import { formatDate, formatTime } from '@/utils/'
import api, { setToken } from '@/api/'
import { Button, ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import styles from './profile.module.sass'
import { useRouter } from 'next/router'
import { AuthAT } from '@/store/actions'
import { GetServerSideProps } from 'next'

const getOrders = async () => {
  try {
    const { data } = await api.get('/user-orders')
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

const Profile = ({ orders }: Props) => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { dispatch: authDispatch } = useContext(AuthContext) as {
    state: AuthState
    dispatch: Function
  }
  const { user } = authState
  const router = useRouter()

  const handleLogout = async () => {
    await api.post('/auth/signout')
    authDispatch({ type: AuthAT.LOGOUT })
    localStorage.clear()
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <>
      <Head title="Profile" />
      <div className="profile page">
        <div className={`container ${styles.profile__container}`}>
          <h2>Profile</h2>
          <div className={styles.profile__grid} style={{ marginBottom: 64 }}>
            <div className={styles.profile__info}>
              <div
                className={styles.profile__avatar}
                style={{
                  backgroundImage: `url('${user?.avatar ?? DEFAULT_AVATAR}')`,
                }}
              ></div>
              <div>
                <div className={styles.profile__username}>{user?.name}</div>
                <div className={styles.profile__email}>{user?.email}</div>
                <div className={styles.profile__roles}>
                  <b>Roles:</b> {user?.roles.join(', ')}
                </div>
                <div className={styles.profile__createdAt}>
                  <b>Joined at:</b>{' '}
                  {user?.createdAt ? formatDate(user?.createdAt) : '--'}
                </div>
              </div>
            </div>
            <div className="btn-group">
              <Link href="/profile/edit" passHref>
                <Button>Edit Profile</Button>
              </Link>
              <Button onClick={handleLogout} color="#ff5722">
                Logout
              </Button>
            </div>
          </div>
          <h2>Orders history</h2>
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
                        <a
                          href={order.invoice}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ButtonSmall color="#3f51b5">
                            View Invoice
                          </ButtonSmall>
                        </a>
                      </td>
                      <td>
                        <Link href={`/orders/${order._id}`} passHref>
                          <ButtonSmall color="#673ab7">View</ButtonSmall>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile
