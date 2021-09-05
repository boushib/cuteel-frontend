import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
