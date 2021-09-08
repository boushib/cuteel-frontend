import api from '@/api'
import { Button, ButtonSmall } from '@/components/Button'
import Head from '@/components/Head'
import { Category } from '@/models/'
import { GetServerSideProps } from 'next'
import styles from './Categories.module.scss'

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

const Categories: React.FC<Props> = ({ categories }) => (
  <>
    <Head title="Categories" />
    <div className={styles.categories}>
      <h2>Categories</h2>
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
                    <ButtonSmall color="#f44336">Delete</ButtonSmall>
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

export default Categories
