import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Button, InlineButton, SubTitle1, SubTitle2 } from '../StyledComponents'
import CommentForm from './CommentForm'

const Blog = ({ blog, likeBlog, loggedInUserId, removeBlog, addComment }) => {
  if (!blog) {
    return null
  }

  const handleLikes = (event) => {
    event.preventDefault()
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const own = blog.user.id
    ? loggedInUserId === blog.user.id
    : loggedInUserId === blog.user

  const creator = useMemo(() => blog.user.name, [])

  return (
    <>
      <SubTitle1>
        {blog.title} by {blog.author}
      </SubTitle1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes}{' '}
        <InlineButton onClick={handleLikes}>like</InlineButton>
      </p>
      <p>added by {creator}</p>
      {own && <Button onClick={handleRemove}>remove</Button>}
      <SubTitle2>comments</SubTitle2>
      <CommentForm addComment={addComment} blogId={blog.id} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default Blog
