import api, { setToken } from '@/api'
import { Ticket } from '@/models'
import Head from '@/components/Head'
import Back from '@/components/Back'

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
          <p>
            <b>Subject:</b>
            <br />
            {ticket.subject}
          </p>
          <br />
          <p>
            <b>Message:</b>
            <br /> {ticket.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TicketPage
