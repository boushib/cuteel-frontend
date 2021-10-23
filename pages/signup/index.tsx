import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import api from '@/api'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import { validateEmail } from '@/utils/'
import { ToastType } from '@/models/'
import { useToast } from '@/hooks/'

export const getServerSideProps = async () => {
  return { props: {} }
}

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const showToast = useToast()

  const handleSubmit = async () => {
    try {
      // form validation
      if (!(name && email && validateEmail(email) && password)) {
        let field = ''
        if (!name) field = 'name'
        else if (!(email && validateEmail(email))) field = 'email'
        else field = 'password'
        throw new Error(`Please enter a valid ${field}!`)
      }
      if (password !== passwordConfirmation) {
        throw new Error('Password & confirmation do not match!')
      }

      await api.post('/auth/signup', { name, email, password })
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message
      showToast({ type: ToastType.ERROR, message })
    }
  }

  return (
    <>
      <Head title="Signup" />
      <div className="signup page">
        <FormContainer>
          <h1>Signup</h1>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            autoFocus={true}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Choose a password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button onClick={handleSubmit}>Signup</Button>
          <LoginLink>
            Already have an account? <Link href="/login">Login</Link>
          </LoginLink>
        </FormContainer>
      </div>
    </>
  )
}

export default Signup

const FormContainer = styled.div`
  width: 360px;
  max-width: 100%;
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
