import api, { setToken } from '@/api/'
import { ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { DEFAULT_AVATAR } from '@/constants/'
import { User } from '@/models/'
import { GetServerSideProps } from 'next'
import { useState } from 'react'

const getCustomers = async () => {
  try {
    const { data } = await api.get('/customers')
    return data.users
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  const customers: Array<User> = await getCustomers()
  return { props: { customers } }
}

type Props = { customers: Array<User> }

const Customers: React.FC<Props> = ({ customers }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [userToDelete, setUserToDelete] = useState('')

  const handleDeleteUser = async (userId: string) => {
    setUserToDelete(userId)
    try {
      setIsProcessing(true)
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.delete(`/users/${userId}`)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    setUserToDelete('')
    setIsProcessing(false)
  }
  return (
    <>
      <Head title="Customers" />
      <div className="customers">
        <h2>Customers</h2>
        {customers.length === 0 && <p>No customers yet!</p>}
        {customers.length > 0 && (
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      <div
                        className="avatar"
                        style={{
                          backgroundImage: `url('${
                            customer.avatar ?? DEFAULT_AVATAR
                          }')`,
                        }}
                      ></div>
                    </td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      {/* <ButtonSmall color="#3f51b5">View</ButtonSmall> */}
                      <ButtonSmall
                        color="#f44336"
                        onClick={() => handleDeleteUser(customer._id)}
                        disabled={isProcessing && userToDelete === customer._id}
                      >
                        Delete
                      </ButtonSmall>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Customers
