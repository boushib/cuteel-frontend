import Head from '@/components/Head'
import api from '@/api'
import { CartState, Category, Product, WishlistState } from '@/models'
import ProductCard from '@/components/ProductCard'
import { useContext, useState } from 'react'
import { CartContext, WishlistContext } from '@/store/providers'
import Checkbox from '@/components/Checkbox'
import styles from './catalog.module.sass'

type GetProductsProps = {
  filters?: any
}

type GetProducts = (props: GetProductsProps) => Promise<Array<Product>>

const getProducts: GetProducts = async ({ filters }) => {
  return api.get('/products')
}

type GetCategories = () => Promise<Array<Category>>

const getCategories: GetCategories = async () => {
  return api.get('/categories')
}

export const getServerSideProps = async () => {
  let props = { products: [], categories: [] }
  try {
    const productsPromise = getProducts({})
    const categoriesPromise = getCategories()
    const [{ data: productsData }, { data: categoriesData }]: any =
      await Promise.all([productsPromise, categoriesPromise])
    const { products } = productsData
    const { categories } = categoriesData
    props = { products, categories }
  } catch (error: any) {
    console.log(error.response)
  }
  return { props }
}

type Filters = {
  categories: Array<string>
  priceRange: { min: number; max: number }
}

type Props = { products: Array<Product>; categories: Array<Category> }

const Products: React.FC<Props> = ({ products, categories }) => {
  const [filters, setFilters] = useState<Filters>({
    categories: categories.map((c) => c.name),
    priceRange: { min: 0, max: 1000000 },
  })
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }
  const { items: cartItems } = cartState
  const { products: wishlistProducts } = wishlistState

  const handleCategoryChange = (isChecked: boolean, category: string) => {
    if (isChecked) {
      setFilters((filters) => ({
        ...filters,
        categories: [...filters.categories, category],
      }))
    } else {
      setFilters((filters) => ({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      }))
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
          {categories.map((c) => (
            <div className={styles.catalog__sidebar__category} key={c._id}>
              <Checkbox
                onChange={(isChecked) =>
                  handleCategoryChange(isChecked, c.name)
                }
                checked={filters.categories.includes(c.name)}
              >
                {c.name}
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
