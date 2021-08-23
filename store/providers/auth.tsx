import { createContext, useReducer, useEffect } from 'react'
import { AuthAT } from '../actions'
import { authReducer } from '../reducers'

const initialState = { loading: true }

export const AuthContext = createContext({})

// Context provider
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      dispatch({ type: AuthAT.SUCCESS, payload: user })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
