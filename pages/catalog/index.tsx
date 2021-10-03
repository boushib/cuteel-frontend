import Link from 'next/link'
import Head from '@/components/Head'
import api from '@/api'
import { CartState, Product, WishlistState } from '@/models'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/Button'
import { useContext } from 'react'
import { CartContext, WishlistContext } from '@/store/providers'

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
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }
  const { items: cartItems } = cartState
  const { products: wishlistProducts } = wishlistState
  return (
    <>
      <Head title="Catalog" />
      <div className="products page">
        <div className="container">
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
