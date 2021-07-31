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
