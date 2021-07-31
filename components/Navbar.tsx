import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import ShoppingCartIcon from '../icons/ShoppingCart'
import SearchIcon from '../icons/Search'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthState } from '../models'
import { AuthContext } from '../store'

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
  const { state } = useContext(AuthContext) as { state: AuthState }
  const { user } = state
  console.log(user)
  const DEFAULT_AVATAR =
    'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
  return (
    <Nav>
      <Container>
        <Image src="/img/logo.png" width="160" height="54" alt="Logo" />
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
        <NavTail>
          <SearchIcon width={20} />
          <ShoppingCartIcon />
          {!user && <Link href="/login">Login</Link>}
          {user && <Avatar img={user.avatar ?? DEFAULT_AVATAR} />}
        </NavTail>
      </Container>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  background-color: #fff;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
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
  svg {
    width: 24px;
    height: 24px;
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
    &.active {
      opacity: 1;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
    path {
      fill: #777;
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
