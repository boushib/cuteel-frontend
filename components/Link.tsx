import NextLink from 'next/link'
import { NextRouter, withRouter } from 'next/router'
import { Children } from 'react'
import { ReactNode, cloneElement } from 'react'

type Props = {
  router: NextRouter
  children: any
  href: string
  passHref?: boolean
  className?: string
}

const Link = withRouter(
  ({ router, children, href, passHref = true, className, ...props }: Props) => (
    <NextLink {...props} href={href}>
      {cloneElement(Children.only(children), {
        className: `${className ? className : ''}${
          router.asPath === href ? ' active' : ''
        }`,
      })}
    </NextLink>
  )
)

export default Link
