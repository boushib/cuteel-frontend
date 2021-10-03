import Head from '@/components/Head'
import api from '@/api'
import { CartState, Product, WishlistState } from '@/models'
import ProductCard from '@/components/ProductCard'
import { useContext, useState } from 'react'
import { CartContext, WishlistContext } from '@/store/providers'
import styles from './catalog.module.sass'
import Checkbox from '@/components/Checkbox'

const CATGEORIES = ['Home', 'Accessories', 'Laptops', 'Gaming']

const getProducts = async () => {
  try {
    const { data } = await api.get('/products')
    return data.products
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps = async () => {
  const products: Array<Product> = await getProducts()
  return { props: { products } }
}

type Props = { products: Array<Product> }

const Products: React.FC<Props> = ({ products }) => {
  const [categories, setCategories] = useState(CATGEORIES)
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }
  const { items: cartItems } = cartState
  const { products: wishlistProducts } = wishlistState

  const handleCategoryChange = (isChecked: boolean, category: string) => {
    if (isChecked) {
      setCategories((categories) => [...categories, category])
    } else {
      setCategories((categories) => categories.filter((c) => c !== category))
    }
  }

  return (
    <>
      <Head title="Catalog" />
      <div className="products page">
        <div className={styles.catalog__sidebar}>
          <div className={styles.catalog__sidebar__label}>
            Filter by Category
          </div>
          {CATGEORIES.map((c) => (
            <div className={styles.catalog__sidebar__category} key={c}>
              <Checkbox
                onChange={(isChecked) => handleCategoryChange(isChecked, c)}
                checked={categories.includes(c)}
              >
                {c}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className={styles.catalog__main}>
          <h2>Catalog</h2>
          {products && products.length > 0 && (
            <div className="grid">
              {products.map((p) => {
                const isInCart =
                  cartItems.find((item) => item.product._id === p._id) !==
                  undefined
                const isInWishlist =
                  wishlistProducts.find((product) => product._id === p._id) !==
                  undefined
                return (
                  <ProductCard
                    product={p}
                    isInCart={isInCart}
                    isInWishlist={isInWishlist}
                    key={p._id}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Products
