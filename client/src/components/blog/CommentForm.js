import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { InlineButton, Input } from '../StyledComponents'

const CommentForm = ({ addComment, blogId }) => {
  const [comment, setComment] = useState('')

  const handleChange = ({ target }) => {
    setComment(target.value)
  }

  const commentBlog = (event) => {
    event.preventDefault()
    addComment(blogId, comment)
    setComment('')
  }

  return (
    <form onSubmit={commentBlog}>
      <div>
        <Input
          type='text'
          value={comment}
          name='Comment'
          id='comment'
          onChange={handleChange}
        />
        <InlineButton type='submit'>add comment</InlineButton>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  blogId: PropTypes.string.isRequired,
}

export default CommentForm
