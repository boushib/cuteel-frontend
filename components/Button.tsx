import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 6px;
  color: #fff;
  background: ${({ color }) => color ?? '#89b24a'};
  box-shadow: 0 4px 14px 0 ${({ color }) => color ?? '#89b24a'}5c;
  line-height: 1;
  padding: 0.9rem 1.4rem;
  font-size: 15px;
  margin-bottom: 12px;
  white-space: nowrap;
  cursor: pointer;
`

export const ButtonSecondary = styled(Button)`
  background-color: #252525;
  box-shadow: 0 4px 14px 0 #25252533;
`

export const ButtonSmall = styled(Button)`
  padding: 10px 16px;
  font-size: 14px;
`
