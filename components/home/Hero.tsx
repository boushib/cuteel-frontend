import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '../Button'
const Hero = () => (
  <HeroContainer>
    <div className="container">
      <HeroHeading>
        <span>Stylish essentials for your home</span>Designed to elevate your
        lifestyle
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
  background-image: url('/img/hero.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  text-align: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(72, 72, 72, 0.5);
    z-index: 0;
  }
  button {
    position: relative;
    z-index: 1;
  }
`

const HeroHeading = styled.h1`
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  position: relative;
  z-index: 1;
  line-height: 1.2;
  max-width: 700px;
  span {
    color: inherit;
    font-size: 20px;
    font-weight: normal;
    display: block;
    margin-bottom: 10px;
  }
`
