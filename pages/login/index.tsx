import { Button } from '../../components/Button'
import styled from 'styled-components'

const Login = () => {
  return (
    <div className="login page">
      <FormContainer>
        <h1>Login</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          autoFocus={true}
        />
        <input type="text" className="form-control" placeholder="Password" />
        <Button>Login</Button>
      </FormContainer>
    </div>
  )
}

export default Login

const FormContainer = styled.div`
  width: 320px;
  margin: 0 auto;
`
