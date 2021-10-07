import Link from 'next/link'
import { AuthState, User } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { Button } from '@/components/Button'
import { useContext } from 'react'
import { AuthContext } from '@/store/providers'
import Head from '@/components/Head'
import styles from './profile.module.sass'
import { formatDate } from '@/utils/'

const Profile = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
  return (
    <>
      <Head title="Profile" />
      <div className="profile page">
        <div className={`container ${styles.profile__container}`}>
          <h2>Profile</h2>
          <div className={styles.profile__grid}>
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
                <div className={styles.profile__createdAt}>
                  <b>Joined at:</b>{' '}
                  {user?.createdAt ? formatDate(user?.createdAt) : '--'}
                </div>
              </div>
            </div>
            <Link href="/profile/edit" passHref>
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
