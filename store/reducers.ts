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
      let items = [...state.items]
      const product = action.payload
      const total = state.total + product.price
      const index = items.findIndex((i) => i.product._id === product._id)

      if (index > -1) {
        items[index].product = product
        items[index].quantity++
      } else {
        items = [...items, { product, quantity: 1 }]
      }

      localStorage.setItem('cart', JSON.stringify({ items, total }))

      return { items, total }

    case CartAT.REMOVE:
      // const product = state.items.find((p) => p._id === action.payload)
      // if (!product) return { ...state }
      // return {
      //   products: [...state.items].filter((p) => p._id !== product?._id),
      //   total: state.total - product.price,
      // }
      return state
    case CartAT.SET:
      return action.payload
    default:
      return state
  }
}
