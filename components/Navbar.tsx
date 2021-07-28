import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import ShoppingCartIcon from '../icons/ShoppingCart'
import SearchIcon from '../icons/Search'
import { useRouter } from 'next/router'

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
  return (
    <Nav>
      <Container>
        <Image src="/img/logo.png" width="200" height="66" alt="Logo" />
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
    transition: color 0.3s ease-in-out;
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
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 20px;
    }
    path {
      fill: #777;
    }
  }
`
