import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Product } from '@/models'
import api, { setToken } from '@/api'
import { Button } from '@/components/Button'
import FileUpload from '@/components/FileUpload'
import Head from '@/components/Head'
import Spinner from '@/components/Spinner'
import styles from '../add.module.scss'

const getProduct = async (id: string) => {
  const { data } = (await api.get(`/products/${id}`)) as any
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

const EditProduct: React.FC<Props> = ({ product }) => {
  const [name, setName] = useState('Product 100')
  const [description, setDescription] = useState('Just testing..')
  const [price, setPrice] = useState(19.99)
  const [category, setCategory] = useState('6105b8e4dd93b34f227b51ca')
  const [image, setImage] = useState<any>()
  const [quantity, setQuantity] = useState(100)
  const [discount, setDiscount] = useState(0)
  const [isBusy, setIsBusy] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setQuantity(product.quantity)
      setDiscount(product.discount * 100)
    }
  }, [product])

  const handleSubmit = async () => {
    try {
      const fd = new FormData()
      if (name && name !== product.name) {
        fd.append('name', name)
      }
      if (description && description !== product.description) {
        fd.append('description', description)
      }
      if (price && price !== product.price) {
        fd.append('price', price.toString())
      }
      if (category && category !== product.category) {
        fd.append('category', category)
      }
      if (quantity && quantity !== product.quantity) {
        fd.append('quantity', quantity.toString())
      }
      if (discount / 100 !== product.discount) {
        fd.append('discount', (discount / 100).toString())
      }
      if (image) {
        fd.append('image', image)
      }
      const headers = { 'Content-Type': 'multipart/form-data' }
      setIsBusy(true)
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.put(`/products/${product._id}`, fd, { headers })
      router.push(`/dashboard/products/${product._id}`)
    } catch (error) {
      console.log(error)
    }
    setIsBusy(false)
  }

  return (
    <>
      <Head title="Edit Product" />
      <div className="edit-product">
        <h2>Edit Product</h2>
        {isBusy && <Spinner />}
        {!isBusy && (
          <>
            <div className={styles.grid}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  placeholder="Product price"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  className="form-control"
                  placeholder="Product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  placeholder="Product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <FileUpload onChange={setImage} />

              <div>
                <label htmlFor="discount">
                  Discount {discount ? `(-${discount}%)` : ''}
                </label>
                <input
                  type="number"
                  id="discount"
                  className="form-control"
                  placeholder="Product discount"
                  min={0}
                  max={100}
                  step={1}
                  value={discount}
                  onChange={(e) => setDiscount(+e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </div>
    </>
  )
}

export default EditProduct
