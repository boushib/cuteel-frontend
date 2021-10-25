import { useEffect } from 'react'
import { io } from 'socket.io-client'
import NotificationsIcon from '@/icons/Notifications'
import styles from './NotificationBox.module.sass'

const NotificationBox = () => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL!)
    socket.on('notification', (notification) => {
      console.log('New notification: ', notification)
    })
  }, [])

  return (
    <div className="notification__box">
      <div className={styles.notification__box__icon}>
        <NotificationsIcon />
        <span></span>
      </div>
    </div>
  )
}

export default NotificationBox
