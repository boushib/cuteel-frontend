import { Product } from '../../models'

export enum WishlistAT {
  ADD = 'ADD_TO_WISHLIST',
  REMOVE = 'REMOVE_FROM_WISHLIST',
  SET = 'SET_WISHLIST',
}

type AddToWishlistAction = {
  type: WishlistAT.ADD
  payload: Product
}

type RemoveFromWishlistAction = {
  type: WishlistAT.REMOVE
  payload: string // product id
}

type SetWishlistAction = {
  type: WishlistAT.SET
  payload: Array<Product>
}

export type WishlistAction =
  | AddToWishlistAction
  | RemoveFromWishlistAction
  | SetWishlistAction
