import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Store from './Store'
import Dashboard from '@/components/dashboard/Dashboard'
import { useRouteChange } from '@/hooks'
import Toast from './Toast'

type Props = {
  pageProps: any
  Component: any
}

const Layout: React.FC<Props> = ({ Component, pageProps }) => {
  const { isLoading } = useRouteChange()
  const router = useRouter()
  const isDashboard = router.pathname.substring(0, 10) === '/dashboard'
  return (
    <>
      <Toast />
      {isDashboard && (
        <Dashboard
          pageProps={pageProps}
          Component={Component}
          isLoading={isLoading}
        />
      )}
      {!isDashboard && (
        <Store
          isLoading={isLoading}
          pageProps={pageProps}
          Component={Component}
        />
      )}
    </>
  )
}

export default Layout
