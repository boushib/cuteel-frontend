import Head from '../../components/Head'
import api from '../../api'
import { Product } from '../../models'
import ProductCard from '../../components/ProductCard'

const getProducts = async () => {
  const { data } = await api.get('/products')
  return data.products
}

export const getServerSideProps = async () => {
  const products: Array<Product> = await getProducts()
  return { props: { products } }
}

type Props = {
  products: Array<Product>
}

const Products: React.FC<Props> = ({ products }) => (
  <div className="products page">
    <Head title="Products" />
    <div className="container">
      <h1>Catalog</h1>
      {products && products.length > 0 && (
        <div className="grid">
          {products.map((p) => (
            <ProductCard
              id={p._id}
              name={p.name}
              image={p.image}
              price={p.price}
              quantity={p.quantity}
              key={p._id}
            />
          ))}
        </div>
      )}
    </div>
  </div>
)

export default Products
