import Search from '../icons/Search'
import styles from './SearchBox.module.scss'

const SearchBox = () => (
  <div className={styles.searchBox}>
    <input
      type="text"
      className={styles.searchBox__input}
      placeholder="Search..."
    />
    <Search />
  </div>
)

export default SearchBox
