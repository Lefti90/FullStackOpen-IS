import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Jepuan prinssi',
    author: 'Rehtori'
  }

  render(<Blog blog={blog}/>)

  //screen.debug()

  const element = screen.getByText(blog.title)
  expect(element).toBeDefined()
})

