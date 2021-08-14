import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../../reducers/notificationReducer'
import { logout } from '../../reducers/loginReducer'
import { LogoutButton, NavText } from '../StyledComponents'

const LoggedUserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('Logging out completed.', 'notification'))
    history.push('/')
  }

  return (
    <>
      <NavText>{user.name} is logged in</NavText>
      <LogoutButton onClick={handleLogout}>logout</LogoutButton>
    </>
  )
}

export default LoggedUserInfo
