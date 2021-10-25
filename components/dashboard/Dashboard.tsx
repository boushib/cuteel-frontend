import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Spinner from '@/components/Spinner'
import styles from './Dashboard.module.scss'
import { useContext } from 'react'
import { AuthState } from '@/models/'
import { AuthContext } from '@/store/providers'
import { useRouter } from 'next/router'

type Props = {
  pageProps: any
  Component: any
  isLoading: boolean
}

const Dashboard: React.FC<Props> = ({ pageProps, Component, isLoading }) => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  const router = useRouter()
  if (!user) return null
  if (!user.roles.includes('admin')) {
    router.replace('/profile')
    return null
  }
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className={styles.dashboard__content}>
        {isLoading && <Spinner />}
        {!isLoading && <Component {...pageProps} />}
      </div>
    </>
  )
}

export default Dashboard
