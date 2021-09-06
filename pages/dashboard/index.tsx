import { useContext } from 'react'
import { AuthState } from '@/models'
import { AuthContext } from '@/store/providers'

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <div className="dashboard">
      <h1>Good morning {user?.name}!</h1>
    </div>
  )
}

export default Dashboard
