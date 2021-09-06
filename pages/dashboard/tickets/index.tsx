import api, { setToken } from '@/api/'
import { ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { Ticket } from '@/models/'
import { GetServerSideProps } from 'next'
import styles from './Tickets.module.scss'

const getTickets = async () => {
  try {
    const { data } = await api.get('/tickets')
    return data.tickets
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  const tickets: Array<Ticket> = await getTickets()
  return { props: { tickets } }
}

type Props = { tickets: Array<Ticket> }

const Tickets: React.FC<Props> = ({ tickets }) => (
  <>
    <Head title="Tickets" />
    <div className={styles.tickets}>
      <h2>Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>{t.subject}</td>
              <td>{t.status}</td>
              <td>{t.description}</td>
              <td>
                <ButtonSmall color="#00bcd4">View</ButtonSmall>
                <ButtonSmall color="#f44336">Delete</ButtonSmall>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)

export default Tickets
