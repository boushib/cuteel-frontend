import { Product } from '@/models'
import ProductCard from './ProductCard'
import styles from './FeaturedProducts.module.scss'

type Props = {
  products: Array<Product>
}

const FeaturedProducts: React.FC<Props> = ({ products }) => (
  <div className={styles.featuredProducts}>
    <div className="container">
      <h2>Best sellers</h2>
      {products && products.length > 0 && (
        <div className="grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard product={p} key={p._id} />
          ))}
        </div>
      )}
    </div>
  </div>
)

export default FeaturedProducts
