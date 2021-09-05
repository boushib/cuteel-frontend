import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/store/providers'
import { AuthState } from '@/models'
import api from '@/api'
import { Button } from '@/components/Button'
import styles from './profile.module.scss'
import FileUpload from '@/components/FileUpload'

const User = () => {
  const [avatar, setAvatar] = useState<File>()
  const [name, setName] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const { state: authState } = useContext(AuthContext) as { state: AuthState }
  const { user } = authState
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
      await api.put(`/users/${user?._id}`, fd, { headers })
      router.push(`/u/${user?._id}`)
    } catch (error) {
      console.log(error)
    }
    setIsBusy(false)
  }

  return (
    <div className="profile page">
      <div className="container">
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

export default User
