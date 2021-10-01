export * from './orders'

export type User = {
  _id: string
  name: string
  email: string
  avatar: string
  roles: Array<string>
}

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  price: number
  category: string
  quantity: number
  createdAt: string
  updatedAt: string
}

export type AuthState = {
  loading: boolean
  user?: User
  error?: string
}

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: Array<CartItem>
  total: number
}

export type WishlistState = {
  products: Array<Product>
}

export type Category = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type Ticket = {
  _id: string
  status: string
  subject: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
}
