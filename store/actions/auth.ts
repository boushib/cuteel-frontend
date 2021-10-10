import { User } from '../../models'

export enum AuthAT {
  PENDING = 'AUTH_PENDING',
  SUCCESS = 'AUTH_SUCCESS',
  ERROR = 'AUTH_ERROR',
  LOGOUT = 'AUTH_LOGOUT',
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

type AuthLogoutAction = {
  type: AuthAT.LOGOUT
}

export type AuthAction =
  | AuthPendingAction
  | AuthSuccessAction
  | AuthErrorAction
  | AuthLogoutAction
