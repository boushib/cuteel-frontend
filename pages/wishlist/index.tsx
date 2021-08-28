import { useContext } from 'react'
import Head from '../../components/Head'
import ProductCard from '../../components/ProductCard'
import { WishlistState } from '../../models'
import { WishlistContext } from '../../store/providers'

const Wishlist = () => {
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }

  const { products } = wishlistState

  return (
    <>
      <Head title="Wishlist" />
      <div className="cart page">
        <div className="container">
          <h1>Wishlist</h1>
          {products.length === 0 && 'Your Wishlist is empty!'}
          {products.length > 0 && (
            <div className="grid">
              {products.map((p) => (
                <ProductCard product={p} key={p._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Wishlist
