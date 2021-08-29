import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '../../api'
import { Button } from '../../components/Button'
import FileUpload from '../../components/FileUpload'
import Head from '../../components/Head'
import Spinner from '../../components/Spinner'
import styles from './add.module.scss'

const AddProduct = () => {
  const [name, setName] = useState('Product 100')
  const [description, setDescription] = useState('Just testing..')
  const [price, setPrice] = useState(19.99)
  const [category, setCategory] = useState('6105b8e4dd93b34f227b51ca')
  const [image, setImage] = useState<any>()
  const [quantity, setQuantity] = useState(100)
  const [isBusy, setIsBusy] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('description', description)
      fd.append('price', price.toString())
      fd.append('category', category)
      fd.append('image', image)
      fd.append('quantity', quantity.toString())
      const headers = { 'Content-Type': 'multipart/form-data' }
      setIsBusy(true)
      await api.post('/products/create', fd, { headers })
      router.push('/catalog')
    } catch (error) {
      console.log(error)
    }
    setIsBusy(false)
  }

  return (
    <>
      <Head title="Add Product" />
      <div className="add-product page">
        <div className="container">
          <h1>New Product</h1>
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
              </div>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AddProduct
