import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SubTitle1, SubTitle2 } from '../StyledComponents'

const UserList = () => {
  const users = useSelector((state) => state.users)

  const alignCenter = {
    textAlign: 'center',
    verticalAlign: 'middle',
  }

  return (
    <div>
      <SubTitle1>Users</SubTitle1>
      <table>
        <thead>
          <tr>
            <td />
            <td>
              <SubTitle2>blogs created</SubTitle2>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={alignCenter}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
