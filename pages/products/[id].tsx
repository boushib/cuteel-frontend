import Head from '../../components/Head'
import api from '../../api'
import { Product } from '../../models'
import { Button } from '../../components/Button'
import styled from 'styled-components'

const getProduct = async (id: string) => {
  const { data } = await api.get(`/products/${id}`)
  return data.product
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = params
  const product: Product = await getProduct(id)
  return { props: { product } }
}

type Props = {
  product: Product
}

const ProductPage: React.FC<Props> = ({ product }) => (
  <div className="product page">
    <Head title={product.name ?? 'Product'} />
    <div className="container">
      <h1>{product.name}</h1>
      <ProductImage img={product.image} />
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>${product.price}</ProductPrice>
      <Button>Add to Cart</Button>
    </div>
  </div>
)

export default ProductPage

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
`

const ProductImage = styled.div`
  width: 440px;
  max-width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
  background-image: url('${(props: { img: string }) => props.img}');
`

const ProductDescription = styled.p`
  font-size: 16px;
  margin: 12px 0;
`
