import { ChangeEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'
import { Product } from '@/models'
import ProductCard from '@/components/ProductCard'
import Search from '@/icons/Search'
import styles from './SearchBox.module.scss'

const SearchBox = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    if (query) getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    setQuery('')
  }, [router.asPath])

  const getProducts = async () => {
    setIsLoading(true)
    const { data } = await api.get(`/products?q=${query}`)
    setProducts(data.products)
    setIsLoading(false)
  }

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchBox__input}
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <Search />
      </div>
      {query && (
        <div className={styles.searchResults}>
          <div className="container">
            <h2>Results for &quot;{query}&quot;</h2>
            {isLoading && 'Loading..'}
            {!isLoading && products && products.length > 0 && (
              <div className="grid">
                {products.map((p) => (
                  <ProductCard product={p} key={p._id} />
                ))}
              </div>
            )}
            {!isLoading && products.length === 0 && <div>Nothing found!</div>}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBox
