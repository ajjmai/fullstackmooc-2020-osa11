import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import {
  initialiseBlogs,
  updateBlog,
  deleteBlog,
  commentBlog,
} from './reducers/blogReducer'
import { initialiseUsers } from './reducers/userReducer'
import { login, getUserFromToken } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/user/LoginForm'
import UserList from './components/user/UserList'
import User from './components/user/User'
import BlogList from './components/blog/BlogList'
import Blog from './components/blog/Blog'
import LoggedUserInfo from './components/user/LoggedUserInfo'
import {
  Title,
  Page,
  Navigation,
  NavLink,
  Footer,
} from './components/StyledComponents'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialiseUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  const handleLogin = async (userObject) => {
    dispatch(login(userObject))
  }

  const likeBlog = async (blogObject) => {
    const blogCreator = blogObject.user.id
      ? blogObject.user.id
      : blogObject.user
    try {
      dispatch(updateBlog(blogObject, blogCreator))
    } catch (exeption) {
      dispatch(setNotification('Updating blog failed.', 'error'))
    }
  }

  const addComment = (blogId, comment) => {
    try {
      dispatch(commentBlog(blogId, comment))
    } catch (exeption) {
      dispatch(setNotification('Commenting blog failed.', 'error'))
    }
  }

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        dispatch(deleteBlog(blogToDelete.id))
        dispatch(
          setNotification(
            `Removed ${blogToDelete.title} by ${blogToDelete.author}.`,
            'notification'
          )
        )
      } catch (exeption) {
        dispatch(
          setNotification(
            `Removing ${blogToDelete.title} by ${blogToDelete.author} failed.`,
            'error'
          )
        )
      }
    }
  }

  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <Page>
      <>
        {loggedInUser && (
          <Navigation>
            <NavLink>
              <Link to='/'>blogs</Link>
            </NavLink>
            <NavLink>
              <Link to='/users'>users</Link>
            </NavLink>
            <LoggedUserInfo />
          </Navigation>
        )}
        <Title>Bloglist</Title>
        <NotificationMessage />
        {!loggedInUser && <LoginForm handleLogin={handleLogin} />}
      </>
      <Switch>
        <Route path='/users/:id'>{loggedInUser && <User user={user} />}</Route>
        <Route path='/users'>{loggedInUser && <UserList />}</Route>
        <Route path='/blogs/:id'>
          {loggedInUser && (
            <Blog
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              loggedInUserId={loggedInUser.id}
              addComment={addComment}
            />
          )}
        </Route>
        <Route path='/'>{loggedInUser && <BlogList />}</Route>
      </Switch>
      <Footer>
        <em>
          <small>Full Stack open 2021 blog list exercise by ajjmai</small>
        </em>
      </Footer>
    </Page>
  )
}

export default App
