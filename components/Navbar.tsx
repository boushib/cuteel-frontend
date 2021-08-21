import styled from 'styled-components'
import Link from 'next/link'
import ShoppingCartIcon from '../icons/ShoppingCart'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthState, CartState } from '../models'
import { AuthContext, CartContext } from '../store'
import Heart from '../icons/Heart'
import SearchBox from './SearchBox'

const ROUTES = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Catalog',
    path: '/catalog',
  },
  {
    name: 'Help & Support',
    path: '/support',
  },
]

const Navbar = () => {
  const router = useRouter()
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { user } = authState
  const { items } = cartState
  const DEFAULT_AVATAR =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
  return (
    <Nav>
      <Container>
        <div className="nav-left">
          <AppLogo />
          <Menu>
            {ROUTES.map((route) => (
              <li
                className={router.pathname === route.path ? 'active' : ''}
                key={route.path}
              >
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </Menu>
        </div>
        <SearchBox />
        <NavTail>
          {/* <SearchIcon width={20} /> */}
          <ShoppingCart count={items.length ?? 0} />
          <Heart />
          {/* {!user && <Link href="/login">Login</Link>} */}
          {user && <Avatar img={user.avatar ?? DEFAULT_AVATAR} />}
        </NavTail>
      </Container>
    </Nav>
  )
}

export default Navbar

const AppLogo = () => (
  <Link href="/" passHref={true}>
    <AppLogoContainer>
      <img src="/img/logo.svg" alt="" />
    </AppLogoContainer>
  </Link>
)

const AppLogoContainer = styled.div`
  cursor: pointer;
  margin-right: 36px;
  img {
    width: 42px;
  }
`

type ShoppingCartProps = {
  count: number
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ count }) => (
  <Link href="/cart" passHref={true}>
    <ShoppingCartContainer>
      {count > 0 && <span>{count}</span>}
      <ShoppingCartIcon />
    </ShoppingCartContainer>
  </Link>
)

const ShoppingCartContainer = styled.div`
  position: relative;
  margin-right: 16px;
  span {
    font-size: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #f44336;
    position: absolute;
    right: 0;
    top: 0;
    flex-shrink: 0;
    padding: 4px;
    z-index: 2;
    height: 18px;
    min-width: 18px;
    transform: translate(50%, -50%);
  }

  svg {
    margin: 0;
  }
`

const Nav = styled.nav`
  background-color: #fff;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
`

const Container = styled.div`
  padding: 0 44px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1200px; */
  margin: 0 auto;
  .nav-left {
    display: flex;
    align-items: center;
  }
`

const Menu = styled.ul`
  padding: 0;
  display: flex;
  align-items: center;
  li {
    font-size: 16px;
    list-style-type: none;
    opacity: 0.6;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
    &.active {
      opacity: 1;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`

const NavTail = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 24px;
  }
  svg {
    width: 20px;
    height: 20px;
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
    &.active {
      opacity: 1;
    }
    &.search,
    &.heart {
      path {
        fill: #777;
      }
    }
    &.shopping-cart {
      height: 22px;
      stroke: #777;
    }
    &.heart {
      width: 22px;
      height: 22px;
    }
  }
`

const Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url('${(props: { img: string }) => props.img}');
  cursor: pointer;
`
