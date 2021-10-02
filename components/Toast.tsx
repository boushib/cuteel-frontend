import { ToastContext } from '@/store/providers'
import { useContext } from 'react'
import { ToastState, ToastType } from '../models'
import styles from './Toast.module.sass'

const Toast = () => {
  const { state: toastState } = useContext(ToastContext) as {
    state: ToastState
  }

  const { toast } = toastState

  if (!toast) return null

  let backgroundColor = '#333'

  if (toast.type === ToastType.SUCCESS) {
    backgroundColor = '#4caf50'
  }
  if (toast.type === ToastType.ERROR) {
    backgroundColor = '#f44336'
  }
  if (toast.type === ToastType.WARNING) {
    backgroundColor = '#ff9800'
  }

  return (
    <div className={styles.toast} style={{ backgroundColor }}>
      {toast?.message}
    </div>
  )
}

export default Toast
