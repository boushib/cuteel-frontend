import styles from './ProductCard.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../store'
import { CartAT } from '../store/actions'
import { Product } from '../models'
import ShoppingCart from '../icons/ShoppingCart'
import Heart from '../icons/Heart'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { dispatch } = useContext(CartContext) as { dispatch: Function }
  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    dispatch({ type: CartAT.ADD, payload: product })
  }
  const { _id, image, name, price, quantity } = product
  return (
    <Link href={`/products/${_id}`} passHref={true}>
      <div className={styles.product__card}>
        <div
          className={styles.product__card__image}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <div className={styles.product__card__header}>
          <div className={styles.product__card__cta} onClick={handleAddToCart}>
            <ShoppingCart />
          </div>
          <div className={styles.product__card__cta}>
            <Heart />
          </div>
        </div>
        <div className={styles.product__card__content}>
          <div className={styles.product__card__name}>{name}</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
