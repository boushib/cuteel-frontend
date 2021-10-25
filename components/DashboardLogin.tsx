type Props = {
  pageProps: any
  Component: any
}

const DashboardLogin = ({ pageProps, Component }: Props) => (
  <Component {...pageProps} />
)

export default DashboardLogin
