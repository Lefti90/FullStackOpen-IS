/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Jepuan prinssi',
    author: 'Rehtori'
  }

  const user ={
    username: 'mluukkai'
  }

  render(<Blog blog={blog} user={user}/>)

  //screen.debug()

  const element = screen.getByText(blog.title)
  expect(element).toBeDefined()
})

