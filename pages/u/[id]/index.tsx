import Link from 'next/link'
import { User } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { Button } from '@/components/Button'
import styles from './profile.module.scss'
import api from '@/api/'

const getUser = async (id: string) => {
  const { data } = await api.get(`/users/${id}`)
  return data.user
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = params
  const user: User = await getUser(id)
  return { props: { user } }
}

type Props = { user: User }

const Profile: React.FC<Props> = ({ user }) => (
  <div className="profile page">
    <div className="container">
      <div className={styles.profile__info}>
        <div
          className={styles.profile__avatar}
          style={{
            backgroundImage: `url('${user?.avatar ?? DEFAULT_AVATAR}')`,
          }}
        ></div>
        <div>
          <div className={styles.profile__username}>{user?.name}</div>
          <div className={styles.profile__email}>{user?.email}</div>
          <div className={styles.profile__roles}>
            <b>Roles:</b> {user?.roles.join(', ')}
          </div>
        </div>
      </div>
      <Link href={`/u/${user?._id}/edit`} passHref>
        <Button>Edit Profile</Button>
      </Link>
    </div>
  </div>
)

export default Profile
