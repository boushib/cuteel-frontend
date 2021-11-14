import api, { setToken } from '@/api/'
import Link from 'next/link'
import { ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { Ticket } from '@/models/'
import { GetServerSideProps } from 'next'
import { formatTime } from '@/utils/'

const getTickets = async () => {
  try {
    const { data } = (await api.get('/tickets')) as any
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
                <th>Created at</th>
                <th>Subject</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{formatTime(ticket.createdAt)}</td>
                  <td>{ticket.subject}</td>
                  {/* <td>{ticket.status}</td> */}
                  <td>
                    <Link href={`/dashboard/tickets/${ticket._id}`} passHref>
                      <ButtonSmall color="#3f51b5">View</ButtonSmall>
                    </Link>
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
