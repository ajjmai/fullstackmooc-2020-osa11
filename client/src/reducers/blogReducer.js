import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(sortByLikes)
    case 'NEW_BLOG':
      return [...state, action.data].sort(sortByLikes)
    case 'LIKE_BLOG':
      return state
        .map((b) => (b.id !== action.data.id ? b : action.data))
        .sort(sortByLikes)
    case 'DELETE_BLOG':
      return state.filter((b) => b.id !== action.data)
    case 'NEW_COMMENT': {
      const blog = state.find((b) => b.id === action.data.id)
      const blogWithNewComment = {
        ...blog,
        comments: blog.comments.concat(action.data.comment),
      }
      return state.map((b) =>
        b.id !== action.data.id ? b : blogWithNewComment
      )
    }
    default:
      return state
  }
}

function sortByLikes(a, b) {
  return b.likes - a.likes
}

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export const updateBlog = (blog, userId) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update({ ...blog, user: userId })
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog,
    })
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId,
    })
  }
}

export const commentBlog = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: { id: blogId, comment: newComment },
    })
  }
}

export default reducer
