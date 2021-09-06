import Link from 'next/link'
import { Product } from '@/models'
import api from '@/api'
import { getImagePath } from '@/utils'
import EditIcon from '@/icons/Edit'
import TrashIcon from '@/icons/Trash'
import styles from './ProductCard.module.scss'

type Props = { product: Product }

const AdminProductCard: React.FC<Props> = ({ product }) => {
  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/products/${product._id}`)
      // TODO: Fetch products
    } catch (error) {
      console.log(error)
    }
  }

  const { _id, image, name, price, quantity } = product

  return (
    <div className={styles.product__card}>
      <div
        className={styles.product__card__image}
        style={{ backgroundImage: `url('${getImagePath(image)}')` }}
      ></div>
      <div className={styles.product__card__header}>
        <div className={styles.product__card__cta}>
          <Link href={`/dashboard/products/${product._id}/edit`} passHref>
            <span style={{ width: 18, height: 18 }}>
              <EditIcon size={18} />
            </span>
          </Link>
        </div>
        <div
          className={styles.product__card__cta}
          onClick={handleDeleteProduct}
        >
          <TrashIcon size={18} />
        </div>
      </div>
      <div className={styles.product__card__content}>
        <div className={styles.product__card__name}>{name}</div>
      </div>
    </div>
  )
}

export default AdminProductCard
