import { useContext } from 'react'
import { AuthState } from '@/models'
import { AuthContext } from '@/store/providers'
import Head from '@/components/Head'
import { getGreeting } from '@/utils/'

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <>
      <Head title="Dashboard" />
      <div className="dashboard">
        <h1>
          {getGreeting()} {user?.name}!
        </h1>
      </div>
    </>
  )
}

export default Dashboard
