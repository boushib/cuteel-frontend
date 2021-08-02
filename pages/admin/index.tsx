import { useContext } from 'react'
import { AuthState } from '../../models'
import { AuthContext } from '../../store'

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <div className="dashboard page">
      <div className="container">
        <h1>Good morning {user?.name}!</h1>
      </div>
    </div>
  )
}

export default Dashboard
