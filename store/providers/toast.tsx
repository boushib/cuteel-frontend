import { createContext, useReducer } from 'react'
import { toastReducer } from '../reducers'

const initialState = { toast: null }

export const ToastContext = createContext({})

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  )
}
