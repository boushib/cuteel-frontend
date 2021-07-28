type Props = {
  id: string
  name: string
  price: number
  quantity: number
}

const ProductCard: React.FC<Props> = ({ id, name, price, quantity }) => (
  <div className="product-card">
    <h2>{name}</h2>
    <h2>${price}</h2>
  </div>
)

export default ProductCard
