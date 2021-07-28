import { Button } from '../../components/Button'
import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    console.log('Submitting form: ', { email, password })
  }

  return (
    <div className="signup page">
      <FormContainer>
        <h1>Signup</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          autoFocus={true}
          onChange={(e) => setName(e.target.value)}
        />
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
        <LoginLink>
          Already have an account? <Link href="/login">Login</Link>
        </LoginLink>
      </FormContainer>
    </div>
  )
}

export default Signup

const FormContainer = styled.div`
  width: 320px;
  margin: 0 auto;
`

const LoginLink = styled.div`
  font-size: 15px;
  opacity: 0.7;
  cursor: pointer;
  a {
    color: ${(props) => props.theme.colors.primary};
  }
`
