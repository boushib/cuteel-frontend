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
        <h3>Ticket {ticket._id}</h3>
        <div className={styles.ticket__details}>
          <div className="card">
            <p>
              <b>Subject:</b> {ticket.subject}
            </p>
            <p>
              <b>Status:</b> {ticket.status}
            </p>
            <p>
              <b>Description:</b> {ticket.description}
            </p>
            <p>
              <b>Created at:</b> {formatTime(ticket.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage
