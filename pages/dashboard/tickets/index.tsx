import api, { setToken } from '@/api/'
import Link from 'next/link'
import { ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { Ticket } from '@/models/'
import { GetServerSideProps } from 'next'

const getTickets = async () => {
  try {
    const { data } = await api.get('/tickets')
    return data.tickets ?? []
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  setToken(req.cookies['token'])
  const tickets: Array<Ticket> = await getTickets()
  return { props: { tickets: tickets ?? [] } }
}

type Props = { tickets: Array<Ticket> }

const Tickets: React.FC<Props> = ({ tickets }) => (
  <>
    <Head title="Tickets" />
    <div className="tickets">
      <h2>Tickets</h2>
      {tickets.length === 0 && <p>No tickets available!</p>}
      {tickets.length > 0 && (
        <div className="card">
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
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.subject}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.description}</td>
                  <td>
                    <Link href={`/dashboard/tickets/${ticket._id}`} passHref>
                      <ButtonSmall color="#3f51b5">View</ButtonSmall>
                    </Link>
                    {ticket.status === 'open' && (
                      <ButtonSmall>Resolve</ButtonSmall>
                    )}
                    {ticket.status === 'resolved' && (
                      <ButtonSmall color="#f44336">Delete</ButtonSmall>
                    )}
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

export default Tickets
