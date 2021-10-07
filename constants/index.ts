export const PAYPAL_CLIENT_ID =
  'ATN-Uh6fPi91FAq9YcjEQGsmCH_ciO9Lo6D3ZR8MnjZQP460lou8dc97ggmf873fnX8unchDaEDGALdT'

export const DEFAULT_AVATAR =
  'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'

export const PRICE_RANGES = [
  {
    label: 'Any range',
    value: { min: 0, max: 1000000 },
  },
  {
    label: '$0 - $20',
    value: { min: 0, max: 20 },
  },
  {
    label: '$20 - $50',
    value: { min: 20, max: 50 },
  },
  {
    label: '$50 - $100',
    value: { min: 50, max: 100 },
  },
  {
    label: '$100 - $200',
    value: { min: 100, max: 200 },
  },
  {
    label: 'More than $200',
    value: { min: 200, max: 1000000 },
  },
]
