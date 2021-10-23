// import Link from 'next/link'
import Link from '../Link'
import CategoryIcon from '@/icons/Category'
// import DiscountIcon from '@/icons/Discount'
// import InvoiceIcon from '@/icons/Invoice'
import ShopIcon from '@/icons/Shop'
import ShoppingCartIcon from '@/icons/ShoppingCart'
import UserIcon from '@/icons/User'
import SupportIcon from '@/icons/Support'
import styles from './Dashboard.module.scss'
import StatsIcon from '@/icons/Stats'

const DashboardSidebar = () => (
  <div className={styles.dashboard__sidebar}>
    <ul className={styles.dashboard__sidebar__nav}>
      <Link href="/dashboard" className={styles.dashboard__sidebar__nav__item}>
        <li>
          <StatsIcon /> Overview
        </li>
      </Link>
      <Link
        href="/dashboard/products"
        className={styles.dashboard__sidebar__nav__item}
      >
        <li>
          <ShopIcon /> Products
        </li>
      </Link>
      <Link
        href="/dashboard/categories"
        className={styles.dashboard__sidebar__nav__item}
      >
        <li>
          <CategoryIcon /> Categories
        </li>
      </Link>
      <Link
        href="/dashboard/orders"
        className={styles.dashboard__sidebar__nav__item}
      >
        <li>
          <ShoppingCartIcon /> Orders
        </li>
      </Link>
      {/* <li>
        <Link href="/dashboard/invoices">
          <div>
            <InvoiceIcon /> Invoices
          </div>
        </Link>
      </li> */}
      {/* <li>
        <Link href="/dashboard/discounts">
          <div>
            <DiscountIcon /> Discounts
          </div>
        </Link>
      </li> */}
      <Link
        href="/dashboard/customers"
        className={styles.dashboard__sidebar__nav__item}
      >
        <li>
          <UserIcon /> Customers
        </li>
      </Link>
      <Link
        href="/dashboard/tickets"
        className={styles.dashboard__sidebar__nav__item}
      >
        <li>
          <SupportIcon /> Tickets
        </li>
      </Link>
      {/* <li>
        <Link href="/dashboard/stats" passHref>
          <div>
            <StatsIcon /> Stats
          </div>
        </Link>
      </li> */}
    </ul>
  </div>
)

export default DashboardSidebar
