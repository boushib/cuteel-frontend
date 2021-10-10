import Link from 'next/link'
import Cookies from 'js-cookie'
import { AuthState, User } from '@/models'
import { DEFAULT_AVATAR } from '@/constants'
import { useContext } from 'react'
import { AuthContext } from '@/store/providers'
import { formatDate } from '@/utils/'
import api from '@/api/'
import { Button } from '@/components/Button'
import Head from '@/components/Head'
import styles from './profile.module.sass'
import { useRouter } from 'next/router'
import { AuthAT } from '@/store/actions'

const Profile = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { dispatch: authDispatch } = useContext(AuthContext) as {
    state: AuthState
    dispatch: Function
  }
  const { user } = authState
  const router = useRouter()

  const handleLogout = async () => {
    await api.post('/auth/signout')
    authDispatch({ type: AuthAT.LOGOUT })
    localStorage.clear()
    Cookies.remove('token')
    router.push('/login')
  }

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
            <div className="btn-group">
              <Link href="/profile/edit" passHref>
                <Button>Edit Profile</Button>
              </Link>
              <Button onClick={handleLogout} color="#ff5722">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
