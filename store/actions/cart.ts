import { Product } from '../../models'

export enum CartAT {
  ADD = 'ADD_TO_CART',
  REMOVE = 'REMOVE_FROM_CART',
}

type AddToCartAction = {
  type: CartAT.ADD
  payload: Product
}

type RemoveFromCartAction = {
  type: CartAT.REMOVE
  payload: string // product id
}

export type CartAction = AddToCartAction | RemoveFromCartAction
