import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { ToastContext } from '@/store/providers'
import { ToastAT } from '@/store/actions'
import { ToastType } from '../models'

export const useRouteChange = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const start = () => setIsLoading(true)
    const stop = () => setIsLoading(false)

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', stop)
    router.events.on('routeChangeError', stop)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', stop)
      router.events.off('routeChangeError', stop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoading }
}

export const useToast = () => {
  const { dispatch: toastDispatch } = useContext(ToastContext) as {
    dispatch: Function
  }

  type Props = { message: string; type: ToastType }

  return ({ message, type }: Props) => {
    toastDispatch({
      type: ToastAT.SHOW,
      payload: { type: ToastType.ERROR, message },
    })
    setTimeout(() => {
      toastDispatch({ type: ToastAT.HIDE })
    }, 5000)
  }
}
