import { User, AuthState } from '../models'
import { AuthAT, AuthAction } from './actions'

// const initialAuthState = {
//   loading: true,
// }

// root reducer
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthAT.PENDING:
      return { loading: true }
    case AuthAT.SUCCESS:
      return { ...state, user: action.payload }
    case AuthAT.ERROR:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
