import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Store from './Store'
import Dashboard from '@/components/dashboard/Dashboard'
import { useRouteChange } from '@/hooks'
import Toast from './Toast'
import DashboardLogin from './DashboardLogin'

type Props = {
  pageProps: any
  Component: any
}

const Layout: React.FC<Props> = ({ Component, pageProps }) => {
  const { isLoading } = useRouteChange()
  const router = useRouter()
  const isDashboardLogin = router.pathname === '/dashboard/login'
  const isDashboard = router.pathname.substring(0, 10) === '/dashboard'
  console.log({ isDashboardLogin })
  return (
    <>
      <Toast />
      {isDashboardLogin && (
        <DashboardLogin pageProps={pageProps} Component={Component} />
      )}
      {isDashboard && !isDashboardLogin && (
        <Dashboard
          pageProps={pageProps}
          Component={Component}
          isLoading={isLoading}
        />
      )}
      {!isDashboard && !isDashboardLogin && (
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
