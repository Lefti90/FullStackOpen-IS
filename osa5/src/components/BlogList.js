import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'

const BlogList = ({ user, setErrorMessage, setMessage }) => {
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs')
        setBlogs(response.data)
      } catch (error) {
        console.log('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  const sortBlogsByLikes = () => {
    const sorted = [...blogs]
    sorted.sort((a, b) => b.likes - a.likes)
    setBlogs(sorted)
  }

  return (
    <div>
      <button id='sortButton' onClick={sortBlogsByLikes}>Sort by Likes</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} setMessage={setMessage} setErrorMessage={setErrorMessage}/>
      ))}
    </div>
  )
}

export default BlogList
