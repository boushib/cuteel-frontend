import styled from 'styled-components'

const Footer = () => (
  <FooterContainer>
    <div className="container">&copy; Cuteel 2021</div>
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

export default Footer
