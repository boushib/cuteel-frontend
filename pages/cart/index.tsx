import { ChangeEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { CartState } from '@/models'
import { CartContext } from '@/store/providers'
import Head from '@/components/Head'
import CartProduct from '@/components/CartProduct'
import { Button } from '@/components/Button'

const Cart = () => {
  const { state: cartState } = useContext(CartContext) as { state: CartState }
  const { items, total } = cartState
  const router = useRouter()

  const SHIPPING_COST = 0

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (!items) return

  return (
    <>
      <Head title="Cart" />
      <div className="cart page">
        <div className="container">
          <h1>Cart</h1>
          {items.length === 0 && (
            <>
              <p>Your Cart is empty! Go add some products to the cart.</p>
            </>
          )}
          {items.length > 0 && (
            <CartGrid>
              <div className="cart__products">
                {items.map((item) => (
                  <CartProduct
                    product={item.product}
                    quantity={item.quantity}
                    key={item.product._id}
                  />
                ))}
              </div>
              <aside>
                <div
                  className="card"
                  style={{ padding: '24px 28px', boxShadow: 'none' }}
                >
                  <Amount>
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </Amount>
                  <Amount>
                    <span>Shipping</span>
                    <span>${SHIPPING_COST.toFixed(2)}</span>
                  </Amount>
                  <Amount>
                    <span>Total</span>
                    <span>${(total + SHIPPING_COST).toFixed(2)}</span>
                  </Amount>
                  <br />
                  <Button onClick={handleCheckout} style={{ marginBottom: 0 }}>
                    Checkout
                  </Button>
                </div>
              </aside>
            </CartGrid>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart

const CartGrid = styled.div`
  display: flex;
  justify-content: space-between;
  aside {
    width: 400px;
  }
  .cart__products {
    flex-grow: 1;
    margin-right: 36px;
    max-width: 720px;
  }
`

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  span {
    font-size: 15px;
    color: #999;
    &:last-child {
      font-weight: 500;
      font-size: 18px;
      color: #aaa;
    }
  }
`
