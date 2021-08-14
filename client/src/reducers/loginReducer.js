import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const setToken = (user) => {
  window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
  blogService.setToken(user.token)
}

export const login = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
      setToken(user)
      dispatch(
        setNotification(
          `Hello ${user.name}! You have succesfully logged in.`,
          'notification'
        )
      )
    } catch (error) {
      dispatch(setNotification('Wrong username or password.', 'error'))
    }
  }
}

export const logout = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT',
  }
}

export const getUserFromToken = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export default reducer
