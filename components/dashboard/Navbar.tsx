import { useContext } from 'react'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models/'
import { getImagePath } from '@/utils/'
import { DEFAULT_AVATAR } from '@/constants/'
import NotificationsIcon from '@/icons/Notifications'

const DashboardNavbar = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  const avatar = user?.avatar ? getImagePath(user?.avatar) : DEFAULT_AVATAR
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
        <div className={styles.dashboard__navbar__notifications}>
          <NotificationsIcon />
          <span></span>
        </div>
        <div
          className={styles.dashboard__navbar__avatar}
          style={{ backgroundImage: `url('${avatar}')` }}
        ></div>
      </div>
    </div>
  )
}

export default DashboardNavbar
