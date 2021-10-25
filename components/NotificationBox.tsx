import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import NotificationsIcon from '@/icons/Notifications'
import styles from './NotificationBox.module.sass'
import { Notification } from '../models'
import ShoppingCartIcon from '@/icons/ShoppingCart'
import { formatTime } from '../utils'
import Link from 'next/link'

const NotificationBox = () => {
  const [notifications, setNotifications] = useState<Array<Notification>>([])
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL!)
    socket.on('notification', (notification) => {
      const _notifications = [...notifications]
      _notifications.push(notification)
      setNotifications(_notifications)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleNotificationBox = () => {
    setIsNotificationBoxOpen(!isNotificationBoxOpen)
  }

  return (
    <div className={styles.notification__box}>
      <div
        className={styles.notification__box__icon}
        onClick={handleToggleNotificationBox}
      >
        <NotificationsIcon />
        {notifications.length > 0 && <span></span>}
      </div>
      {isNotificationBoxOpen && (
        <ul className={styles.notification__box__list}>
          {notifications.length === 0 && <p>No new notifications!</p>}
          {notifications.length > 0 &&
            notifications.map((n) => (
              <NotificationItem notification={n} key={n._id} />
            ))}
        </ul>
      )}
    </div>
  )
}

type NotificationItemProps = {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationItemProps) => (
  <Link href={notification.url} passHref>
    <li className={styles.notification__box__list__item}>
      <div className={styles.notification__box__list__item__icon}>
        <ShoppingCartIcon size={18} />
      </div>
      <div>
        <div className={styles.notification__box__list__item__message}>
          {notification.message}
        </div>
        <div className={styles.notification__box__list__item__date}>
          {formatTime(notification.date)}
        </div>
      </div>
    </li>
  </Link>
)

export default NotificationBox
