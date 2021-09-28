import { useState } from 'react'
import { useRouter } from 'next/router'
import api, { setToken } from '@/api'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import Spinner from '@/components/Spinner'
import styles from './add.module.sass'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsBusy(true)
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.post('/categories/create', { name, description })
      router.push('/dashboard/categories')
    } catch (error) {
      console.log(error)
    }
    setIsBusy(false)
  }

  return (
    <>
      <Head title="Add Category" />
      <div className="add-category">
        <h2>New Category</h2>
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
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Category description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={isBusy}>
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default AddCategory
