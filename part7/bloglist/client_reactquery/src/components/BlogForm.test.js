import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Add Blog')

  await user.type(inputs[0], 'testing the form title...')
  await user.type(inputs[1], 'testing the form author...')
  await user.type(inputs[2], 'testing the form url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing the form title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing the form author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing the form url...')
})
