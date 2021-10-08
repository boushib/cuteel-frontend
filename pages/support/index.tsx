import { Button } from '@/components/Button'
import Head from '@/components/Head'
import { useState, useContext } from 'react'
import api from '@/api'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models'

const Support = () => {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [isTicketCreated, setIsTicketCreated] = useState(false)

  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState

  const createTicket = async () => {
    try {
      await api.post('/tickets/create', {
        subject,
        description,
        userId: user?._id,
      })
      setIsTicketCreated(true)
    } catch (error: any) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="support page">
      <Head title="Help &amp; Support" />
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="page__header">
          <h1>Contact us</h1>
          <a href="/tickets">My tickets</a>
        </div>
        {isTicketCreated && (
          <p>
            Your ticket has been received! We will get in touch with you soon!
          </p>
        )}
        {!isTicketCreated && (
          <>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <textarea
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <Button onClick={createTicket}>Create a ticket</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Support
