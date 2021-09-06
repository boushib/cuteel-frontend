import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Spinner from '@/components/Spinner'
import styles from './Dashboard.module.scss'

type Props = {
  pageProps: any
  Component: any
  isLoading: boolean
}

const Dashboard: React.FC<Props> = ({ pageProps, Component, isLoading }) => (
  <>
    <Sidebar />
    <Navbar />
    <div className={styles.dashboard__content}>
      {isLoading && <Spinner />}
      {!isLoading && <Component {...pageProps} />}
    </div>
  </>
)

export default Dashboard
