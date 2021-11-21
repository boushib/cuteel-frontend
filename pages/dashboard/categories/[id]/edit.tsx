import { useState } from 'react'
import { useRouter } from 'next/router'
import api, { setToken } from '@/api'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import Spinner from '@/components/Spinner'
import styles from '../add.module.sass'
import { Category } from '@/models/'
import { GetServerSideProps } from 'next'

const getCategory = async (id: string) => {
  try {
    const { data } = (await api.get(`/categories/${id}`)) as any
    return data.category
  } catch (error: any) {
    return null
  }
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  setToken(req.cookies['token'])
  const category = await getCategory(`${params?.id}`)
  return { props: { category } }
}

type Props = {
  category: Category
}

const EditCategory = ({ category }: Props) => {
  const [name, setName] = useState(category?.name)
  const [description, setDescription] = useState(category?.description)
  const [isBusy, setIsBusy] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsBusy(true)
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.put(`/categories/${category?._id}`, { name, description })
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
        <h2>Update Category</h2>
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
              Save
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default EditCategory
