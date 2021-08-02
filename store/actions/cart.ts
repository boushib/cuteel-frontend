import { CartItem, Product } from '../../models'

export enum CartAT {
  ADD = 'ADD_TO_CART',
  REMOVE = 'REMOVE_FROM_CART',
  SET = 'SET_CART',
}

type AddToCartAction = {
  type: CartAT.ADD
  payload: Product
}

type SetCartAction = {
  type: CartAT.SET
  payload: {
    items: Array<CartItem>
    total: number
  }
}

type RemoveFromCartAction = {
  type: CartAT.REMOVE
  payload: string // product id
}

export type CartAction = AddToCartAction | RemoveFromCartAction | SetCartAction
