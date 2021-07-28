import { Button } from '../../components/Button'
import styled from 'styled-components'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    console.log('Submitting form: ', { email, password })
  }

  return (
    <div className="login page">
      <FormContainer>
        <h1>Login</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          autoFocus={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Login</Button>
      </FormContainer>
    </div>
  )
}

export default Login

const FormContainer = styled.div`
  width: 320px;
  margin: 0 auto;
`
