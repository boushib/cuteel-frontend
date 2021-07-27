import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import ShoppingCartIcon from '../icons/ShoppingCart'
import SearchIcon from '../icons/Search'

const Navbar = () => (
  <Nav>
    <Container>
      <Image src="/img/logo.png" width="200" height="66" alt="Logo" />
      <Menu>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/catalog">Catalog</Link>
        </li>
        <li>
          <Link href="/support">Help &amp; Support</Link>
        </li>
      </Menu>
      <NavTail>
        <SearchIcon width={20} />
        <ShoppingCartIcon />
      </NavTail>
    </Container>
  </Nav>
)

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
    cursor: pointer;
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
