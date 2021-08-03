import { Button } from '../../components/Button'
import styled from 'styled-components'
import { useState, useContext } from 'react'
import api from '../../api'
import { useRouter } from 'next/router'

const CreateCategory = () => {
  const [name, setName] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/categories/create', { name })
      const { category } = data
      console.log(category)
      router.push('/admin')
    } catch (error: any) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="create-category page">
      <div className="container">
        <FormContainer>
          <h1>New Category</h1>
          <input
            type="text"
            className="form-control"
            placeholder="Category name"
            autoFocus={true}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSubmit}>Create</Button>
        </FormContainer>
      </div>
    </div>
  )
}

export default CreateCategory

const FormContainer = styled.div`
  width: 440px;
  max-width: 100%;
  margin: 0 auto;
`