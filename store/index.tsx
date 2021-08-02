import { createContext, useReducer, useEffect } from 'react'
import { AuthAT } from './actions'
import { authReducer, cartReducer } from './reducers'

// Auth Context

const initialAuthState = { loading: true }

export const AuthContext = createContext({})

// Context provider
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      dispatch({ type: AuthAT.SUCCESS, payload: user })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Cart Context

const initialCartState = { items: [], total: 0 }

export const CartContext = createContext({})

// Context provider
export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
