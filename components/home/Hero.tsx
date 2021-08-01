import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '../Button'
const Hero = () => (
  <HeroContainer>
    <div className="container">
      <HeroHeading>
        <span>Welcome to</span> Cuteel
      </HeroHeading>
      <Link href="/catalog" passHref={true}>
        <Button>Shop now</Button>
      </Link>
    </div>
  </HeroContainer>
)

export default Hero

const HeroContainer = styled.div`
  background-color: #eee;
  height: 100vh;
  max-height: 540px;
  padding: 60px 0;
  display: flex;
  align-items: center;
`

const HeroHeading = styled.h1`
  font-size: 36px;
  font-weight: 600;
  span {
    font-size: 15px;
    font-weight: normal;
    display: block;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`
