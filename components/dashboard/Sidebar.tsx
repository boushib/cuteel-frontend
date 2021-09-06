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
        <ShopIcon /> Products
      </li>
      <li>
        <CategoryIcon /> Categories
      </li>
      <li>
        <ShoppingCartIcon /> Orders
      </li>
      <li>
        <InvoiceIcon /> Invoices
      </li>
      <li>
        <DiscountIcon /> Discounts
      </li>
      <li>
        <UserIcon /> Customers
      </li>
      <li>
        <SupportIcon size={24} /> Tickets
      </li>
      <li>
        <StatsIcon /> Stats
      </li>
    </ul>
  </div>
)

export default DashboardSidebar
