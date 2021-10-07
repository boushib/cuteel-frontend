import Link from 'next/link'
import { AuthState, User } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { Button } from '@/components/Button'
import styles from './profile.module.scss'
import api from '@/api/'
import { useContext } from 'react'
import { AuthContext } from '@/store/providers'
import Head from '@/components/Head'

const Profile = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <>
      <Head title="Profile" />
      <div className="profile page">
        <div className="container">
          <h2>Profile</h2>
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
          <Link href="/profile/edit" passHref>
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Profile
