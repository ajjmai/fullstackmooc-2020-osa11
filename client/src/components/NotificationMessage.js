import React from 'react'
import { useSelector } from 'react-redux'
import { Notification } from './StyledComponents'

const NotificationMessage = () => {
  const notification = useSelector((state) => state.notification)

  return (
    notification.content && (
      <Notification className={notification.className}>
        {notification.content}
      </Notification>
    )
  )
}

export default NotificationMessage
