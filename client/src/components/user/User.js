import React from 'react'
import PropTypes from 'prop-types'
import { SubTitle1, SubTitle2 } from '../StyledComponents'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <SubTitle1>{user.name}</SubTitle1>
      <SubTitle2>added blogs</SubTitle2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
}

export default User
