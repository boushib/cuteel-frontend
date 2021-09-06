import { useContext } from 'react'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models/'

const DashboardNavbar = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <div className={styles.dashboard__navbar}>
      <Link href="/dashboard" passHref={true}>
        <img src="/img/logo.svg" alt="" />
      </Link>
      <div className="dashboard__nav__user">Hello {user?.name}!</div>
    </div>
  )
}

export default DashboardNavbar
