import api, { setToken } from '@/api/'
import { ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { DEFAULT_AVATAR } from '@/constants/'
import { User } from '@/models/'
import { getImagePath } from '@/utils/'
import { GetServerSideProps } from 'next'

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

const Customers: React.FC<Props> = ({ customers }) => (
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
                          customer.avatar
                            ? getImagePath(customer.avatar)
                            : DEFAULT_AVATAR
                        }')`,
                      }}
                    ></div>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <ButtonSmall color="#3f51b5">View</ButtonSmall>
                    <ButtonSmall color="#f44336">Delete</ButtonSmall>
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

export default Customers
