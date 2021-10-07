import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthState, User } from '@/models'
import api, { setToken } from '@/api'
import { Button } from '@/components/Button'
import styles from './profile.module.sass'
import FileUpload from '@/components/FileUpload'
import { AuthContext } from '@/store/providers'

const EditProfile = () => {
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState

  const [avatar, setAvatar] = useState<File>()
  const [name, setName] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  const handleSave = async () => {
    try {
      const fd = new FormData()

      if (name && name !== user?.name) {
        fd.append('name', name)
      }

      if (avatar) {
        fd.append('avatar', avatar)
      }

      if (!avatar && name === user?.name) {
        return
      }

      const headers = { 'Content-Type': 'multipart/form-data' }
      setIsBusy(true)
      const token = localStorage.getItem('token')
      setToken(`${token}`)
      await api.put(`/users/${user?._id}`, fd, { headers })
      router.push('/profile')
    } catch (error) {
      console.log(error)
    }
    setIsBusy(false)
  }

  return (
    <div className="profile page">
      <div className={`container ${styles.profile__container}`}>
        <div className={styles.profile__card}>
          <h1>Edit Profile</h1>
          <FileUpload onChange={setAvatar} />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
