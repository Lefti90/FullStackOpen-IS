/* eslint-disable no-undef */
const React = require('react')
require('@testing-library/jest-dom/extend-expect')
const { render, screen } = require('@testing-library/react')
const Blog = require('./Blog')

test('renders content', () => {
  const blog = {
    title: 'Jepuan prinssi',
    author: 'Rehtori'
  }

  render(<Blog blog={blog}/>)

  screen.debug()

  const element = screen.getByText(blog.title)
  expect(element).toBeDefined()
})

