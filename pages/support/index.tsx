import { useState, useContext } from 'react'
import api, { setToken } from '@/api'
import { AuthContext } from '@/store/providers'
import { AuthState, ToastType } from '@/models'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import Link from 'next/link'
import { useToast } from '@/hooks/'

const Support = () => {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [isTicketCreated, setIsTicketCreated] = useState(false)
  const showToast = useToast()

  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState

  const createTicket = async () => {
    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.post('/tickets/create', {
        subject,
        description,
        userId: user?._id,
      })
      setIsTicketCreated(true)
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message
      showToast({ type: ToastType.ERROR, message })
    }
  }

  return (
    <div className="support page">
      <Head title="Support" />
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="page__header">
          <h1>Contact us</h1>
          <Link href="/tickets">My tickets</Link>
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
