import { ChangeEvent, useState } from 'react'
import { Button } from './Button'

type Props = { onProceed: () => void }

const CheckoutAddress = ({ onProceed }: Props) => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((s) => ({ ...s, [name]: value }))
  }

  const handleProceed = () => {
    // TODO: Form validation
    console.log(address)
    onProceed()
  }

  return (
    <div
      className="checkout__address"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <div className="form-group">
        <div>
          <label htmlFor="">Firstname</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="John"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">Lastname</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Smith"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <label htmlFor="">Email Address</label>
      <input
        type="text"
        name="email"
        className="form-control"
        placeholder="johnsmith@domain.com"
        onChange={handleFieldChange}
      />
      <label htmlFor="">Street</label>
      <input
        type="text"
        name="address"
        className="form-control"
        placeholder="GH98 Lot Palmiers"
        onChange={handleFieldChange}
      />
      <div className="form-group">
        <div>
          <label htmlFor="">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="city"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            placeholder="Casablanca-Settat"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
            placeholder="990001"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            placeholder="Morocco"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  )
}

export default CheckoutAddress
