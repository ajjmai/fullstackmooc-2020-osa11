import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const mockLikes = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'A blog about testing',
      author: 'Just me',
      url: 'www.just.me',
      likes: 10,
      user: {
        name: 'Ada Lovelace',
      },
    }

    component = render(
      <Blog
        blog={blog}
        likeBlog={mockLikes}
        loggedInUsername={'adalove'}
        removeBlog={jest.fn()}
      />
    )
  })

  test('should render title and author by default but not url or likes', () => {
    expect(component.container).toHaveTextContent(
      'A blog about testing by Just me'
    )
    expect(component.container).not.toHaveTextContent('www.just.me')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('should render url and likes when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.just.me')
    expect(component.container).toHaveTextContent('likes 10')
  })

  test('should call likeBlog handler function twice when like button is clicked twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikes).toHaveBeenCalledTimes(2)
  })
})
