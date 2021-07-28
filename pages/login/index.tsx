import { Button } from '../../components/Button'
import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'
import api from '../../api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/signin', { email, password })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      console.log(error)
    }
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
        <SignupLink>
          {"Don't have an account? "} <Link href="/signup">Signup</Link>
        </SignupLink>
      </FormContainer>
    </div>
  )
}

export default Login

const FormContainer = styled.div`
  width: 320px;
  margin: 0 auto;
`

const SignupLink = styled.div`
  font-size: 15px;
  opacity: 0.7;
  cursor: pointer;
  a {
    color: ${(props) => props.theme.colors.primary};
  }
`
