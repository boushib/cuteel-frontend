import { Button } from '../../components/Button'
import Head from '../../components/Head'

const Support = () => (
  <div className="support page">
    <Head title="Help &amp; Support" />
    <div className="container">
      <h1>Contact us</h1>
      <input type="text" className="form-control" placeholder="Name" />
      <input type="text" className="form-control" placeholder="Email" />
      <textarea className="form-control" placeholder="Message"></textarea>
      <Button>Send</Button>
    </div>
  </div>
)

export default Support
