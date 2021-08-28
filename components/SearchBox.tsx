import { ChangeEvent, useState, useEffect } from 'react'
import Search from '../icons/Search'
import styles from './SearchBox.module.scss'
import api from '../api'
import { Product } from '../models'
import ProductCard from '../components/ProductCard'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    if (query) getProducts()
  }, [query])

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
          onChange={handleQueryChange}
        />
        <Search />
      </div>
      {
        query && <div className={styles.searchResults}>
          <div className="container">
            <h2>Results for "{query}"</h2>
            {isLoading && 'Loading..'}
            {!isLoading && products && products.length > 0 && (
              <div className="grid">
                {products.map((p) => (
                  <ProductCard product={p} key={p._id} />
                ))}
              </div>
            )}
            {!isLoading && products.length === 0 && (
              <div>Nothing found!</div>
            )}
          </div>
        </div>
      }
    </>
  )
}

export default SearchBox
