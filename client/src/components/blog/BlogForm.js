import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, SubTitle1, Input } from '../StyledComponents'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <>
      <SubTitle1>Add new blog</SubTitle1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <Input
            type='text'
            value={title}
            name='Title'
            id='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <Input
            type='text'
            value={author}
            name='Author'
            id='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <Input
            type='text'
            value={url}
            name='Url'
            id='url'
            onChange={handleUrlChange}
          />
        </div>
        <Button type='submit'>Add</Button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
