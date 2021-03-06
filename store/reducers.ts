import { AuthState, CartState, WishlistState, ToastState } from '../models'
import {
  AuthAT,
  AuthAction,
  CartAction,
  CartAT,
  ToastAction,
  ToastAT,
} from './actions'
import { WishlistAction, WishlistAT } from './actions/wishlist'

// Auth reducer
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthAT.PENDING:
      return { loading: true }
    case AuthAT.SUCCESS:
      return { ...state, user: action.payload }
    case AuthAT.ERROR:
      return { loading: false, error: action.payload }
    case AuthAT.LOGOUT:
      return { loading: false }
    default:
      return state
  }
}

// Cart reducer
export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartAT.ADD:
      let items = [...state.items]
      let product = { ...action.payload }
      const price = (1 - product.discount) * product.price
      product = { ...product, price }
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
      const productId = action.payload
      const rItems = [...state.items].filter((i) => i.product._id !== productId)
      let t = 0
      rItems.forEach((i) => {
        const price = (1 - i.product.discount) * i.product.price
        t += price * i.quantity
      })
      localStorage.setItem('cart', JSON.stringify({ items: rItems, total: t }))
      return { items: rItems, total: t }
    case CartAT.SET:
      localStorage.setItem('cart', JSON.stringify(action.payload))
      return action.payload
    default:
      return state
  }
}

// Cart reducer
export const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
) => {
  switch (action.type) {
    case WishlistAT.ADD:
      const products = [...state.products]
      const product = action.payload
      const index = products.findIndex((p) => p._id === product._id)
      if (index === -1) {
        products.push(action.payload)
        localStorage.setItem('wishlist', JSON.stringify(products))
      }
      return { products }
    case WishlistAT.REMOVE:
      const productId = action.payload
      const rProducts = [...state.products].filter((p) => p._id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(rProducts))
      return { products: rProducts }
    case WishlistAT.SET:
      return { products: action.payload }
    default:
      return state
  }
}

// Toast reducer
export const toastReducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case ToastAT.SHOW:
      return { toast: action.payload }
    case ToastAT.HIDE:
      return { toast: null }
    default:
      return state
  }
}
