const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesReducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(likesReducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {}

  const favoriteReducer = (currentFavorite, nextItem) => {
    return currentFavorite.likes < nextItem.likes ? nextItem : currentFavorite
  }
  const favorite = blogs.reduce(favoriteReducer, blogs[0])

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return {}

  return _.zipObject(
    ['author', 'blogs'],
    _.chain(blogs).countBy('author').toPairs().max(_.last).toArray().value()
  )
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) return {}

  return _.chain(blogs)
    .groupBy('author')
    .map((objs, key) => ({ author: key, likes: _.sumBy(objs, 'likes') }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
