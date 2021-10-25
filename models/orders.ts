export type ShippingAddress = {
  name: string
  email: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

export type OrderItem = {
  productId: string
  name: string
  description: string
  quantity: number
  price: number
  tax: number
}

export type Order = {
  _id: string
  userId: string
  shipping: ShippingAddress
  items: Array<OrderItem>
  subtotal: number
  total: number
  currency: string
  billingDate: string
  dueDate: string
  invoice: string
  createdAt: string
  updatedAt: string
}

export type CreatedOrder = {
  userId: string
  shipping: ShippingAddress
  items: Array<{
    productId: string
    name: string
    description: string
    quantity: number
    price: number
    tax: number
  }>
  subtotal: number
  total: number
  currency: string
  billingDate: string
  dueDate: string
}
