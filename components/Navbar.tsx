import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { AuthState, CartState, WishlistState } from '@/models'
import { AuthContext, CartContext, WishlistContext } from '@/store/providers'
import ShoppingCartIcon from '@/icons/ShoppingCart'
import HeartIcon from '@/icons/Heart'
import SearchBox from './SearchBox'
import { DEFAULT_AVATAR } from '../constants'

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
  const { state: wishlistState } = useContext(WishlistContext) as {
    state: WishlistState
  }
  const { user } = authState
  const { items } = cartState
  const { products: wishlistProducts } = wishlistState
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
          <ShoppingCart count={items.length ?? 0} />
          <WishList isEmpty={wishlistProducts.length === 0} />
          {/* {!user && <Link href="/login">Login</Link>} */}
          {user && (
            <Link href={`/u/${user._id}`} passHref>
              <Avatar img={user.avatar ?? DEFAULT_AVATAR} />
            </Link>
          )}
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

const ShoppingCartContainer = styled.div`
  position: relative;
  margin-right: 16px;
  display: flex;
  span {
    font-size: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #ff5722;
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

const ShoppingCart: React.FC<ShoppingCartProps> = ({ count }) => (
  <Link href="/cart" passHref={true}>
    <ShoppingCartContainer>
      {count > 0 && <span>{count}</span>}
      <ShoppingCartIcon />
    </ShoppingCartContainer>
  </Link>
)

const WishListContainer = styled.div`
  position: relative;
  display: flex;
  span {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #00bcd4;
    position: absolute;
    right: -1px;
    top: -3px;
    z-index: 2;
  }
`

type WishlistProps = {
  isEmpty: boolean
}

const WishList: React.FC<WishlistProps> = ({ isEmpty }) => (
  <Link href="/wishlist" passHref>
    <WishListContainer>
      {!isEmpty && <span></span>}
      <HeartIcon />
    </WishListContainer>
  </Link>
)

const Nav = styled.nav`
  background-color: #fff;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
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
    font-weight: 400;
    cursor: pointer;
    &.active {
      opacity: 1;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
    a {
      font: inherit;
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
