import { createContext, useReducer, useEffect } from 'react'
import { CartAT } from '../actions'
import { cartReducer } from '../reducers'

const initialState = { items: [], total: 0 }

export const CartContext = createContext({})

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const cart = JSON.parse(storedCart)
      dispatch({ type: CartAT.SET, payload: cart })
    }
  }, [])
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
