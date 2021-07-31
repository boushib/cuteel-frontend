import { AuthState, CartState } from '../models'
import { AuthAT, AuthAction, CartAction, CartAT } from './actions'

// Auth reducer
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthAT.PENDING:
      return { loading: true }
    case AuthAT.SUCCESS:
      return { ...state, user: action.payload }
    case AuthAT.ERROR:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// Cart reducer
export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartAT.ADD:
      return {
        products: [...state.products, action.payload],
        total: state.total + action.payload.price,
      }
    case CartAT.REMOVE:
      const product = state.products.find((p) => p._id === action.payload)
      if (!product) return { ...state }
      return {
        products: [...state.products].filter((p) => p._id !== product?._id),
        total: state.total - product.price,
      }
    default:
      return state
  }
}
