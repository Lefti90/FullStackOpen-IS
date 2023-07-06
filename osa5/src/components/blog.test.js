/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import axios from 'axios' //Import accios to access logged in user
import BlogForm from './BlogForm'

jest.mock('axios')

describe('Bloglist tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    const toggleDetails = jest.fn()

    const blog = {
      title: 'Jepuan prinssi',
      author: 'Rehtori',
      user: 'Matti Luukkainen',
      likes: 1
    }

    const loggedInUser ={
      username: 'mluukkai'
    }

    //get logged in user
    axios.get.mockResolvedValue({ data: [{ username: loggedInUser.username }] })

    render(
      <Blog
        blog={blog}
        user={loggedInUser}
        toggleDetails={toggleDetails}
        setErrorMessage={jest.fn()}
        setMessage={jest.fn()}
      />
    )
  })
  test('Clicking the button shows details', async () => {
    const useri = userEvent.setup()
    const button = screen.getByText('Show details')
    await useri.click(button)

    expect(screen.findByText('Hide details')).toBeDefined()
  })

  test('Press like 2 times', async () => {
    const useri = userEvent.setup()
    const button1 = screen.getByText('Show details')
    await useri.click(button1)
    const button2 = screen.getByText('Like')
    await useri.click(button2)
    await useri.click(button2)

    expect(screen.findByText('Likes: 3')).toBeDefined()
  })

  test('Creating new blog works properly', async () => {
    const handleBlogCreation = jest.fn()
    render(<BlogForm handleBlogCreation={handleBlogCreation}/>)

    const useri = userEvent.setup()

    const input = screen.getByPlaceholderText('Title test')
    const submitButton = screen.getByText('Create')

    await useri.type(input, 'Test title...')
    await useri.click(submitButton)

    expect(handleBlogCreation.mock.calls).toHaveLength(1)
    expect(handleBlogCreation.mock.calls[0][0].title).toBe('Test title...')
  })
})


