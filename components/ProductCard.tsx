import { useContext } from 'react'
import Link from 'next/link'
import { CartContext, ToastContext, WishlistContext } from '@/store/providers'
import { CartAT, ToastAT, WishlistAT } from '@/store/actions'
import { Product, ToastType } from '@/models'
import ShoppingCart from '@/icons/ShoppingCart'
import Heart from '@/icons/Heart'
import styles from './ProductCard.module.sass'
import Delete from '@/icons/Delete'

type Props = {
  product: Product
  showAddToWishlist?: boolean
  isInCart?: boolean
  isInWishlist?: boolean
}

const ProductCard: React.FC<Props> = ({
  product,
  showAddToWishlist = true,
  isInCart = false,
  isInWishlist = false,
}) => {
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

  const handleRemoveFromWishlist = (e: any) => {
    e.stopPropagation()
    wishlistDispatch({ type: WishlistAT.REMOVE, payload: product._id })
  }

  const { _id, image, name, price, quantity, discount } = product

  return (
    <Link href={`/products/${_id}`} passHref={true}>
      <div className={styles.product__card__container}>
        {discount > 0 && (
          <div className={styles.product__card__discount}>
            -{Math.round(100 * discount)}%
          </div>
        )}
        <div className={styles.product__card}>
          <div
            className={styles.product__card__image}
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
          <div className={styles.product__card__header}>
            <div
              className={`${styles.product__card__cta}${
                isInCart ? ' ' + styles['product__card__cta--active'] : ''
              }`}
              onClick={handleAddToCart}
            >
              <ShoppingCart />
            </div>
            {showAddToWishlist && (
              <div
                className={`${styles.product__card__cta} ${
                  styles['product__card__cta--wishlist']
                }${
                  isInWishlist ? ' ' + styles['product__card__cta--active'] : ''
                }`}
                onClick={handleAddToWishlist}
              >
                <Heart />
              </div>
            )}
            {!showAddToWishlist && (
              <div
                className={styles.product__card__cta}
                onClick={handleRemoveFromWishlist}
                style={{ backgroundColor: '#ff5722' }}
              >
                <Delete size={12} />
              </div>
            )}
          </div>
          <div className={styles.product__card__content}>
            <div className={styles.product__card__name}>{name}</div>
            {discount === 0 && (
              <div className={styles.product__card__price}>${price}</div>
            )}
            {discount > 0 && (
              <div className={styles.product__card__price}>
                <span
                  style={{ marginRight: 12, textDecoration: 'line-through' }}
                >
                  ${price}
                </span>
                ${(price * (1 - discount)).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
