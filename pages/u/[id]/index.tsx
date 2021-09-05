import { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { Button } from '@/components/Button'
import styles from './profile.module.scss'

const User = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
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
}

export default User
