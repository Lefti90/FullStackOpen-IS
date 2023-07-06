/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import axios from 'axios' //Import accios to access logged in user

jest.mock('axios')

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Jepuan prinssi',
    author: 'Rehtori',
    user: 'Matti Luukkainen'
  }

  const loggedInUser ={
    username: 'mluukkai'
  }

  const mockHandler = jest.fn()

  //get logged in user
  axios.get.mockResolvedValue({ data: [{ username: loggedInUser.username }] })

  render(
    <Blog
      blog={blog}
      user={loggedInUser}
      toggleDetails={mockHandler}
    />
  )

  const useri = userEvent.setup()
  const button = screen.getByText('Show details')
  await useri.click(button)

  expect(screen.findByText('Hide details')).toBeDefined()
})
