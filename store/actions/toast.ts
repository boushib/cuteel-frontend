import { Toast } from '../../models'

export enum ToastAT {
  SHOW = 'SHOW_TOAST',
  HIDE = 'HIDE_TOAST',
}

type ShowToastAction = {
  type: ToastAT.SHOW
  payload: Toast
}

type HideToastAction = {
  type: ToastAT.HIDE
}

export type ToastAction = ShowToastAction | HideToastAction
