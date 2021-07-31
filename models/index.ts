export type User = {
  _id: string
  name: string
  email: string
  roles: Array<string>
}

export type Product = {
  _id: string
  name: string
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
