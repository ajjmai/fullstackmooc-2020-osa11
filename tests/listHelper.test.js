const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  listWithTwoBlogs,
  listWithManyBlogs,
} = require('./testUtils')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('is 0 when list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('equals the likes of one blog when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('is calculated right when list has many blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('there is none when list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('equals that blog when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    })
  })

  test('equals one of the blogs when list has two blogs with as many likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual({
      title: listWithTwoBlogs[0].title,
      author: listWithTwoBlogs[0].author,
      likes: listWithTwoBlogs[0].likes,
    })
  })

  test('is calculated right when list has many blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: listWithManyBlogs[2].title,
      author: listWithManyBlogs[2].author,
      likes: listWithManyBlogs[2].likes,
    })
  })
})

describe('mostBlogs', () => {
  test('there is none when list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('equals that author when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    })
  })

  test('equals one of the blogs when list has two authors with as many blogs', () => {
    const result = listHelper.mostBlogs(listWithTwoBlogs)
    expect(result).toEqual({
      author: listWithTwoBlogs[0].author,
      blogs: 1,
    })
  })

  test('is calculated right when list has many blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('mostLikes', () => {
  test('there is none when list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('equals that author when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: 5,
    })
  })

  test('equals one of the blogs when list has two authors with as many blogs', () => {
    const result = listHelper.mostLikes(listWithTwoBlogs)
    expect(result).toEqual({
      author: listWithTwoBlogs[0].author,
      likes: 5,
    })
  })

  test('is calculated right when list has many blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
