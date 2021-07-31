import { User } from '../../models'

export enum AuthAT {
  PENDING = 'AUTH_PENDING',
  SUCCESS = 'AUTH_SUCCESS',
  ERROR = 'AUTH_ERROR',
}

type AuthPendingAction = {
  type: AuthAT.PENDING
}
type AuthSuccessAction = {
  type: AuthAT.SUCCESS
  payload: User
}
type AuthErrorAction = {
  type: AuthAT.ERROR
  payload: string
}
export type AuthAction = AuthPendingAction | AuthSuccessAction | AuthErrorAction
