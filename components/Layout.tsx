import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Store from './Store'
import Dashboard from '@/pages/admin'
import { useRouteChange } from '@/hooks'

type Props = {
  pageProps: any
  Component: any
}

const Layout: React.FC<Props> = ({ Component, pageProps }) => {
  const { isLoading } = useRouteChange()
  const router = useRouter()
  const isDashboard = router.pathname === '/admin'
  return (
    <>
      {isDashboard && <Dashboard />}
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
