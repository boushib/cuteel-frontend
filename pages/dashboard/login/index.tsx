import { useState, useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import api from '@/api'
import { AuthContext } from '@/store/providers'
import { AuthAT } from '@/store/actions'
import { AuthState, ToastType } from '@/models'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import { useToast } from '@/hooks/'
import { validateEmail } from '@/utils/'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const showToast = useToast()

  const { dispatch: authDispatch } = useContext(AuthContext) as {
    state: AuthState
    dispatch: Function
  }

  const handleSubmit = async () => {
    try {
      // form validation
      if (!(email && validateEmail(email) && password)) {
        let field = ''
        if (!(email && validateEmail(email))) field = 'email'
        else if (!password) field = 'password'
        throw new Error(`Please enter a valid ${field}!`)
      }
      authDispatch({ type: AuthAT.PENDING })
      const { data } = await api.post('/auth/admin-signin', { email, password })
      const { user, token } = data
      authDispatch({ type: AuthAT.SUCCESS, payload: user })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      Cookies.set('token', token)
      router.push('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message
      showToast({ type: ToastType.ERROR, message })
      authDispatch({ type: AuthAT.ERROR, payload: message })
    }
  }

  return (
    <>
      <Head title="Login" />
      <div
        className="login page"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <FormContainer>
          <h1>Login</h1>
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
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>Login</Button>
          <SignupLink>
            {"Don't have an account? "} <Link href="/signup">Signup</Link>
          </SignupLink>
        </FormContainer>
      </div>
    </>
  )
}

export default Login

const FormContainer = styled.div`
  width: 360px;
  max-width: 100%;
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
