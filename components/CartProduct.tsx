import styled from 'styled-components'
import { Product } from '../models'

// import './CartProduct.scss'

type Props = {
  product: Product
  quantity: number
}

const CartProduct: React.FC<Props> = ({ product, quantity }) => {
  const { image, name } = product
  return (
    // <CartProductContainer>
    //   <CartProductName>{name}</CartProductName>
    //   <CartProductPrice>${price}</CartProductPrice>
    // </CartProductContainer>
    <div
      className="cart__product"
      style={{ display: 'flex', marginBottom: 24 }}
    >
      <div
        className="product__image"
        style={{
          backgroundImage: `url('${image}')`,
          width: 100,
          height: 100,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div>
        <div className="product__name">{name}</div>
      </div>
    </div>
  )
}

export default CartProduct

// const CartProductContainer = styled.div`
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 4px;
//   margin-bottom: 16px;
// `

// const CartProductName = styled.h2`
//   font-size: 24px;
//   margin-bottom: 12px;
// `

// const CartProductPrice = styled.div`
//   font-size: 20px;
// `
