import api, { setToken } from '@/api'
import Link from 'next/link'
import { Button, ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { Category } from '@/models/'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const getCategories = async () => {
  try {
    const { data } = await api.get('/categories')
    return data.categories
  } catch (error: any) {
    console.log(error.response)
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: Array<Category> = await getCategories()
  return { props: { categories } }
}

type Props = { categories: Array<Category> }

const Categories: React.FC<Props> = ({ categories }) => {
  const [isDeletingCategory, setIsDeletingCategory] = useState(false)
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('')
  const router = useRouter()

  const handleDelete = async (categoryId: string) => {
    try {
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      setIsDeletingCategory(true)
      setCategoryIdToDelete(categoryId)
      await api.delete(`/categories/${categoryId}`)
      router.push('/dashboard/categories')
    } catch (error) {
      console.log(error)
    }
    setIsDeletingCategory(false)
  }
  return (
    <>
      <Head title="Categories" />
      <div className="categories">
        <div className="page__header">
          <h2>Categories</h2>
          <Link href="/dashboard/categories/add" passHref>
            <Button>Add Category</Button>
          </Link>
        </div>
        {categories.length > 0 && (
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.description}</td>
                    <td>
                      <ButtonSmall color="#3f51b5">Edit</ButtonSmall>
                      <ButtonSmall
                        disabled={
                          isDeletingCategory && categoryIdToDelete === c._id
                        }
                        color="#f44336"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </ButtonSmall>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Categories
