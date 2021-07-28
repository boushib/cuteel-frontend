import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 6px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 14px 0 ${({ theme }) => theme.colors.primary}5c;
  line-height: 1;
  padding: 0.9rem 1.4rem;
  font-size: 15px;
  margin-bottom: 12px;
  cursor: pointer;
`

export const ButtonSecondary = styled(Button)`
  background-color: #252525;
  box-shadow: 0 4px 14px 0 #25252533;
`
