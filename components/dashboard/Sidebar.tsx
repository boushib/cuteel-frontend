import Link from 'next/link'
import CategoryIcon from '@/icons/Category'
import DiscountIcon from '@/icons/Discount'
import InvoiceIcon from '@/icons/Invoice'
import ShopIcon from '@/icons/Shop'
import ShoppingCartIcon from '@/icons/ShoppingCart'
import UserIcon from '@/icons/User'
import SupportIcon from '@/icons/Support'
import styles from './Dashboard.module.scss'
import StatsIcon from '@/icons/Stats'

const DashboardSidebar = () => (
  <div className={styles.dashboard__sidebar}>
    <ul>
      <li>
        <Link href="/dashboard" passHref>
          <div>
            <StatsIcon /> Overview
          </div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/products" passHref>
          <div>
            <ShopIcon /> Products
          </div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/categories" passHref>
          <div>
            <CategoryIcon /> Categories
          </div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/orders" passHref>
          <div>
            <ShoppingCartIcon /> Orders
          </div>
        </Link>
      </li>
      {/* <li>
        <Link href="/dashboard/invoices" passHref>
          <div>
            <InvoiceIcon /> Invoices
          </div>
        </Link>
      </li> */}
      {/* <li>
        <Link href="/dashboard/discounts" passHref>
          <div>
            <DiscountIcon /> Discounts
          </div>
        </Link>
      </li> */}
      <li>
        <Link href="/dashboard/customers" passHref>
          <div>
            <UserIcon /> Customers
          </div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/tickets" passHref>
          <div>
            <SupportIcon /> Tickets
          </div>
        </Link>
      </li>
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
