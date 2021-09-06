import { useContext } from 'react'
import { AuthState } from '@/models'
import { AuthContext } from '@/store/providers'
import Head from '@/components/Head'
import { getGreeting } from '@/utils/'
import { Button } from '@/components/Button'

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <>
      <Head title="Dashboard" />
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p style={{ fontSize: 16, marginBottom: 20 }}>
          {getGreeting()} <b>{user?.name}</b>! How can I help?
        </p>
        <div className="btn-group">
          <Button>View products</Button>
          <Button>Add products</Button>
          <Button>Manage orders</Button>
          <Button>Manage customers</Button>
          <Button>Manage tickets</Button>
          <Button>Manage discounts</Button>
        </div>
      </div>
    </>
  )
}

export default Dashboard
