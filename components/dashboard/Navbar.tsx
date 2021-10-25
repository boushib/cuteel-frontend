import { useContext } from 'react'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models/'
import { DEFAULT_AVATAR } from '@/constants/'
import NotificationsIcon from '@/icons/Notifications'
import api from '@/api/'
import { AuthAT } from '@/store/actions'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const DashboardNavbar = () => {
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
    router.push('/dashboard/login')
  }

  return (
    <div className={styles.dashboard__navbar}>
      <Link href="/dashboard" passHref={true}>
        <img
          src="/img/logo.svg"
          alt=""
          className={styles.dashboard__navbar__logo}
        />
      </Link>
      <div className={styles.dashboard__navbar__tail}>
        {/* <div className={styles.dashboard__navbar__notifications}>
          <NotificationsIcon />
          <span></span>
        </div> */}
        <div className={styles.dashboard__navbar__user}>
          <div
            className={styles.dashboard__navbar__avatar}
            style={{
              backgroundImage: `url('${user?.avatar ?? DEFAULT_AVATAR}')`,
            }}
          >
            <div className={styles.dashboard__navbar__user__dropdown}>
              <Link href="/catalog" passHref>
                <li>Store</li>
              </Link>
              <li onClick={handleLogout}>Logout</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar
