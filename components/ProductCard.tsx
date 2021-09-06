import { useContext } from 'react'
import Link from 'next/link'
import { CartContext, WishlistContext } from '@/store/providers'
import { CartAT, WishlistAT } from '@/store/actions'
import { Product } from '@/models'
import { getImagePath } from '@/utils'
import ShoppingCart from '@/icons/ShoppingCart'
import Heart from '@/icons/Heart'
import styles from './ProductCard.module.scss'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { dispatch: cartDispatch } = useContext(CartContext) as {
    dispatch: Function
  }
  const { dispatch: wishlistDispatch } = useContext(WishlistContext) as {
    dispatch: Function
  }
  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    cartDispatch({ type: CartAT.ADD, payload: product })
  }
  const handleAddToWishlist = (e: any) => {
    e.stopPropagation()
    wishlistDispatch({ type: WishlistAT.ADD, payload: product })
  }
  const { _id, image, name, price, quantity } = product
  return (
    <Link href={`/products/${_id}`} passHref={true}>
      <div className={styles.product__card}>
        <div
          className={styles.product__card__image}
          style={{ backgroundImage: `url('${getImagePath(image)}')` }}
        ></div>
        <div className={styles.product__card__header}>
          <div className={styles.product__card__cta} onClick={handleAddToCart}>
            <ShoppingCart />
          </div>
          <div
            className={styles.product__card__cta}
            onClick={handleAddToWishlist}
          >
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
