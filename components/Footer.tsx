import styled from 'styled-components'

const Footer = () => (
  <FooterContainer>
    <div className="container">
      <FooterInner>
        &copy; Cuteel 2021
        <img src="/img/payment-methods.svg" alt="" />
      </FooterInner>
    </div>
  </FooterContainer>
)

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px 0;
  font-size: 15px;
  color: #999;
  border-top: 1px solid #dedede;
  & > * {
    color: inherit;
  }
`

const FooterInner = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 28px;
  }
`

export default Footer
