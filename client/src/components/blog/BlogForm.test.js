import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('should call handler function with correct information', () => {
    const mockCreate = jest.fn()

    const component = render(<BlogForm createBlog={mockCreate} />)

    const titleField = document.getElementById('title')
    fireEvent.change(titleField, { target: { value: 'Testing is fun' } })

    const authorField = document.getElementById('author')
    fireEvent.change(authorField, { target: { value: 'Just me' } })

    const urlField = document.getElementById('url')
    fireEvent.change(urlField, { target: { value: 'www.just.me' } })

    const submit = component.getByText('Add')
    fireEvent.click(submit)
    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate.mock.calls[0][0].title).toBe('Testing is fun')
    expect(mockCreate.mock.calls[0][0].author).toBe('Just me')
    expect(mockCreate.mock.calls[0][0].url).toBe('www.just.me')
  })
})
