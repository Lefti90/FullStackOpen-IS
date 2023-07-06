/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import axios from 'axios' //Import accios to access logged in user

jest.mock('axios')

describe('Bloglist tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    const mockHandler = jest.fn()

    const blog = {
      title: 'Jepuan prinssi',
      author: 'Rehtori',
      user: 'Matti Luukkainen',
      likes: 1
    }

    const loggedInUser ={
      username: 'mluukkai'
    }

    render(
      <Blog
        blog={blog}
        user={loggedInUser}
        toggleDetails={mockHandler}
        setErrorMessage={jest.fn()}
        setMessage={jest.fn()}
      />
    )

    //get logged in user
    axios.get.mockResolvedValue({ data: [{ username: loggedInUser.username }] })
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


})


