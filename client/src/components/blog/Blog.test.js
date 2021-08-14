import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const mockLikes = jest.fn()

  beforeEach(() => {
    const blog = {
      id: '1',
      title: 'A blog about testing',
      author: 'Just me',
      url: 'www.just.me',
      likes: 10,
      user: {
        name: 'Ada Lovelace',
      },
    }

    component = render(
      <Blog blog={blog} likeBlog={mockLikes} loggedInUserId='adalove' removeBlog={jest.fn()} addComment={jest.fn()} />
    )
  })

  test('should render blog info', () => {
    expect(component.container).toHaveTextContent('A blog about testing by Just me')
    expect(component.container).toHaveTextContent('www.just.me')
    expect(component.container).toHaveTextContent('added by Ada Lovelace')
  })

  test('should call likeBlog handler function twice when like button is clicked twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikes).toHaveBeenCalledTimes(2)
  })
})
