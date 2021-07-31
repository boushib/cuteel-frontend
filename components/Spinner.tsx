import styled from 'styled-components'

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 8px solid #689f38;
  border-right-color: #7cb342;
  border-bottom-color: #8bc34a;
  border-left-color: #9ccc65;
  animation: spin 1s linear infinite;
  margin: 24px auto;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
