const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'blog not found' })
  }
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decocedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decocedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decocedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    editedBlog,
    { new: true }
  )
  response.status(200).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decocedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decocedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }

  if (blog.user.toString() === decocedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
  } else {
    return response
      .status(401)
      .json({ error: 'user has no permission to delete this blog' })
  }

  response.status(204).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  blog.save()

  response.status(201).json(comment)
})

module.exports = blogsRouter
