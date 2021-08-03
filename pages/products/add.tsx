import { useState } from 'react'
import { Button } from '../../components/Button'
import styled from 'styled-components'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(20)
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = () => {
    // upload image
    // submit product details
    console.log({ name, description, price, category, image, quantity })
  }

  return (
    <div className="add-product page">
      <div className="container">
        <h1>New Product</h1>
        <FormRow>
          <input
            type="text"
            className="form-control"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </FormRow>
        <FormRow>
          <input
            type="text"
            className="form-control"
            placeholder="Product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Product quantity"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
        </FormRow>
        <textarea
          className="form-control"
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          placeholder="Product image"
          onChange={(e) => setImage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AddProduct

const FormRow = styled.div`
  display: flex;
  input {
    width: calc(50% - 10px);
    &:first-child {
      margin-right: 20px;
    }
  }
`
