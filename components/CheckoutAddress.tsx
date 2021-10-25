import { ChangeEvent, useState } from 'react'
import { useToast } from '../hooks'
import { ShippingAddress, ToastType } from '../models'
import { Button } from './Button'

type Props = { onProceed: (address: ShippingAddress) => void }

const CheckoutAddress = ({ onProceed }: Props) => {
  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const showToast = useToast()

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((s) => ({ ...s, [name]: value }))
  }

  const handleProceed = () => {
    try {
      const fields = Object.entries(address)
      for (let [key, value] of fields) {
        if (!value) {
          const field = (key.charAt(0).toUpperCase() + key.slice(1))
            .match(/[A-Z][a-z]+/g)
            ?.map((s) => s.toLowerCase())
            ?.join(' ')
          throw new Error(`Please enter a valid ${field}!`)
        }
      }
      onProceed(address)
    } catch (error: any) {
      const { message } = error
      showToast({ message, type: ToastType.ERROR })
    }
  }

  return (
    <div
      className="checkout__address"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <div className="form-group">
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="John Smith"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="name@domain.com"
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <label htmlFor="">Address</label>
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
