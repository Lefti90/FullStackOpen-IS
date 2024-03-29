import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = ({ blog, user, setMessage, setErrorMessage }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Get logged in user
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/api/users')
        const users = response.data
        const loggedInUser = users.find(u => u.username === user.username) //match with username
        setLoggedInUser(loggedInUser)
      } catch (error) {
        console.log('Error getting logged-in user:', error)
      }
    }

    getLoggedInUser()
  }, [user.username])

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const url = `/api/blogs/${blog.id}`
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      setMessage('Thanks for a like!')
      blog.likes = blog.likes + 1
      setTimeout(() => {
        setMessage(null)
        //window.location.reload()
      }, 0)
      await axios.put(url, updatedBlog, config)
    } catch (error) {
      setErrorMessage('Error updating blog')
      console.log('Error updating blog:', error)
    }
  }

  const deleteBlog = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete ${blog.title}?`)

      if (!confirmed) return // Do nothing if canceled

      const url = `/api/blogs/${blog.id}`
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.delete(url, config)
      setMessage('Blog deleted!')
      setTimeout(() => {
        setMessage(null)
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log('Error deleting blog:', error)
    }
  }

  return (
    <div style={blogStyle} className='blog' data-testid="blog-component">
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails} id='toggleDetails'>{showDetails ? 'Hide' : 'Show'} details</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div id='likesDiv'>
            Likes: {blog.likes} <button onClick={handleLike} id='likeButton'>Like</button>
          </div>
          <div>Added by {blog.user.name}</div>
          {/* {console.log('Logged-in User ID:', loggedInUser && loggedInUser.id)}
          {console.log(user.username)}
          {console.log('Blog User ID:', blog.user && blog.user.id)} */}
          {user && loggedInUser && loggedInUser.id === blog.user.id && (
            <button onClick={deleteBlog} id='deleteButton'>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
