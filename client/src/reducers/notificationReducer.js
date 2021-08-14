const initialState = { content: null, className: null, timer: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timer) {
        clearTimeout(state.timer)
      }
      return {
        content: action.data.content,
        className: action.data.className,
        timer: action.data.timer,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content, className) => {
  return (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, className, timer },
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
