import Checkmark from '../../icons/Checkmark'

const Order = () => {
  return (
    <div className="order page">
      <div className="container">
        <h1>Order</h1>
        <div className="form__steps">
          <div className="form__step done">
            <div className="form__step__number">
              <Checkmark />
            </div>
            <div className="form__step__name">Personal details</div>
          </div>
          <div className="form__step current">
            <div className="form__step__number">2</div>
            <div className="form__step__name">Shipping address</div>
          </div>
          <div className="form__step">
            <div className="form__step__number">3</div>
            <div className="form__step__name">Payment Method</div>
          </div>
          <div className="form__step">
            <div className="form__step__number">4</div>
            <div className="form__step__name">Place order</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
