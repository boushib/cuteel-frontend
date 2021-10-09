import { Line, Bar } from 'react-chartjs-2'
import { useContext } from 'react'
import { AuthState } from '@/models'
import { AuthContext } from '@/store/providers'
import Head from '@/components/Head'
import styles from './Overview.module.sass'
import Shop from '@/icons/Shop'
import User from '@/icons/User'
import ShoppingCart from '@/icons/ShoppingCart'
import Money from '@/icons/Money'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Orders',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(239, 83, 80)',
      borderColor: 'rgba(239, 83, 80, 0.2)',
    },
  ],
}

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
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
              <div className={styles.overview__item__value}>56</div>
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
              <div className={styles.overview__item__value}>567</div>
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
              <div className={styles.overview__item__value}>$23980</div>
            </div>
          </div>
          <div
            className={`${styles.overview__item} ${styles['overview__item--var4']}`}
          >
            <div className={styles.overview__item__icon}>
              <User size={24} />
            </div>
            <div>
              <div className={styles.overview__item__label}>Users</div>
              <div className={styles.overview__item__value}>112</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48%', height: 400 }}>
            <Line data={data} options={options} />
          </div>
          <div style={{ width: '48%', height: 400, marginLeft: '4%' }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
