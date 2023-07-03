import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog test', () => {
  let   container
  // const mockHandler = jest.fn()
  let likeHandler


  beforeEach(() => {
    likeHandler = jest.fn()

    const blog = {
      title: 'How to cook',
      author: 'Michel',
      url: 'Some link',
      likes: 5,
      user: {
        name: 'mike'
      }
    }

    const loggedUser = {
      username: 'mike-ninja',
      name: 'mike'
    }

    container = render(
      <Blog blog={blog} loggedUser={loggedUser} increaseLike={likeHandler} />
    ).container
  })

  test('renders content', async () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'How to cook'
    )
  })

  test('At the start, the extra data is not display', () => {
    const div = container.querySelector('.extraData')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, extra data are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.extraData')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Clicking the like button calls event handler', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByRole('button', { name: 'view' })
    await user.click(viewButton)

    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler).toHaveBeenCalledTimes(2)
  })
})
