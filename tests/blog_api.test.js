const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./testUtils')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  let token

  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 11)
    const user = new User({ username: 'adalove', passwordHash })

    await user.save()

    token = jwt.sign({ username: 'adalove', id: user._id }, process.env.SECRET)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithManyBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain('React patterns')
  })

  test('blogs contain field "id"', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id).toBeDefined()
  })

  describe('adding a new blog', () => {
    let token

    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('salainen', 11)
      const user = new User({ username: 'adalove', passwordHash })

      await user.save()

      token = jwt.sign(
        { username: 'adalove', id: user._id },
        process.env.SECRET
      )
    })

    test('succeeds with a valid data', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(helper.listWithOneBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((blog) => blog.title)

      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)
      expect(titles).toContain(helper.listWithOneBlog[0].title)
    })

    test('likes is 0 if no initial value is given', async () => {
      const newBlog = {
        title: 'The semantic future of the web',
        author: 'James Turner',
        url:
          'https://stackoverflow.blog/2020/12/10/the-semantic-future-of-the-web/',
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })

    test('fails with status code 400 if title missing', async () => {
      const newBlog = {
        author: 'James Turner',
        url:
          'https://stackoverflow.blog/2020/12/10/the-semantic-future-of-the-web/',
        likes: 1,
      }

      const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`title` is required')

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })

    test('fails with status code 400 if url missing', async () => {
      const newBlog = {
        title: 'The semantic future of the web',
        author: 'James Turner',
        likes: 1,
      }

      const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`url` is required')

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })

    test('should fail with status code 401 when token is missing', async () => {
      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer')
        .send(helper.listWithOneBlog[0])
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('invalid token')

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })
  })

  describe('editing a blog', () => {
    test('should succeed with status code 200 with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToEdit = blogsAtStart[0]
      const editedBlog = { ...blogToEdit, likes: blogToEdit.likes + 5 }

      const response = await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(editedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(blogToEdit.likes + 5)
    })
  })

  describe('deletion of a blog', () => {
    test.skip('should succeed with a status code 204 with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length - 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('should fail with status code 400 with invalid id', async () => {
      await api
        .delete(`/api/blogs/${helper.nonExistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
