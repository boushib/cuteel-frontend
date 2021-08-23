import { createContext, useReducer, useEffect } from 'react'
import { WishlistAT } from '../actions'
import { wishlistReducer } from '../reducers'

const initialState = { products: [] }

export const WishlistContext = createContext({})

export const WishlistProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      const wishlist = JSON.parse(storedWishlist)
      dispatch({ type: WishlistAT.SET, payload: wishlist })
    }
  }, [])
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  )
}
