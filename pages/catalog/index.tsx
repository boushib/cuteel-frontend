import Head from '@/components/Head'
import api from '@/api'
import { CartState, Category, Product, WishlistState } from '@/models'
import ProductCard from '@/components/ProductCard'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { CartContext, WishlistContext } from '@/store/providers'
import Checkbox from '@/components/Checkbox'
import styles from './catalog.module.sass'
import Radio from '@/components/Radio'
import { PRICE_RANGES } from '@/constants/'

type Filters = {
  categories: Array<Category>
  priceRange: { min: number; max: number }
}

type GetProductsProps = {
  filters?: Filters
}

// type GetProducts = (props: GetProductsProps) => Promise<Array<Product>>
type GetProducts = (props: GetProductsProps) => Promise<any>

const getProducts: GetProducts = async ({ filters }) => {
  let query = ''
  if (filters) {
    const { categories, priceRange } = filters
    const categ = categories.map((c) => c._id).join(',')
    const { min: minPrice, max: maxPrice } = priceRange
    query = `?categ=${categ}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  }
  return api.get(`/products${query}`)
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

type Props = { products: Array<Product>; categories: Array<Category> }

const Products: React.FC<Props> = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState<Filters>({
    categories: categories,
    priceRange: { min: 0, max: 1000000 },
  })
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }
  const { items: cartItems } = cartState
  const { products: wishlistProducts } = wishlistState

  useEffect(() => {
    fetchAndPopulateProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const fetchAndPopulateProducts = async () => {
    const { data } = await getProducts({ filters })
    setFilteredProducts(data.products)
  }

  const handleCategoryChange = async (
    isChecked: boolean,
    category: Category
  ) => {
    let categories: Array<Category> = []
    if (isChecked) {
      categories = [...filters.categories, category]
      setFilters((filters) => ({
        ...filters,
        categories,
      }))
    } else {
      categories = filters.categories.filter((c) => c._id !== category._id)
      setFilters((filters) => ({
        ...filters,
        categories,
      }))
    }
  }

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [min, max] = e.target.value.split(',').map((s) => +s)
    console.log({ min, max })
    setFilters({ ...filters, priceRange: { min, max } })
  }

  return (
    <>
      <Head title="Catalog" />
      <div className="products page">
        <div className={styles.catalog__sidebar}>
          <div className={styles.catalog__sidebar__label}>
            Filter by category
          </div>
          <div className={styles.catalog__sidebar__section}>
            {categories.map((c) => (
              <div className={styles.catalog__sidebar__category} key={c._id}>
                <Checkbox
                  onChange={(isChecked) => handleCategoryChange(isChecked, c)}
                  checked={filters.categories.includes(c)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <div className={styles.catalog__sidebar__section}>
            <div className={styles.catalog__sidebar__label}>
              Filter by price range
            </div>
            {PRICE_RANGES.map((r) => (
              <Radio
                name="priceRange"
                label={r.label}
                value={`${r.value.min},${r.value.max}`}
                checked={
                  r.value.min === filters.priceRange.min &&
                  r.value.max === filters.priceRange.max
                }
                onChange={handlePriceRangeChange}
                key={r.label}
              />
            ))}
          </div>
        </div>
        <div className={styles.catalog__main}>
          <h2>Catalog</h2>
          {!filteredProducts ||
            (filteredProducts.length === 0 && <p>No products found!</p>)}
          {filteredProducts && filteredProducts.length > 0 && (
            <div className="grid">
              {filteredProducts.map((p) => {
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
