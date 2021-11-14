import api, { setToken } from '@/api'
import { Ticket } from '@/models'
import Head from '@/components/Head'
import Back from '@/components/Back'
import styles from './ticket.module.sass'
import { formatTime } from '@/utils/'

const getTicket = async (id: string) => {
  const { data } = (await api.get(`/tickets/${id}`)) as any
  return data.ticket
}

export const getServerSideProps = async ({ req, params }: any) => {
  setToken(req.cookies['token'])
  const { id } = params
  const ticket: Ticket = await getTicket(id)
  return { props: { ticket } }
}

type Props = { ticket: Ticket }

const TicketPage = ({ ticket }: Props) => {
  return (
    <div className="ticket page">
      <Head title="Ticket" />
      <div className="container" style={{ maxWidth: 1024 }}>
        <Back page="Tickets" />
        <div className="card">
          <h3>Ticket</h3>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Created at</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ticket._id}</td>
                <td>{formatTime(ticket.createdAt)}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.status}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div className={styles.ticket__message}>
            <div className={styles.ticket__message__heading}>Message</div>
            <p className={styles.ticket__message__body}>{ticket.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage
