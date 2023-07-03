import React, { useState } from "react"
//import blogService from '../services/blogs'
import axios from "axios"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  //Handle likes
  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const url = `/api/blogs/${blog.id}`
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      await axios.put(url, JSON.stringify(updatedBlog), config)
    } catch (error) {
      console.log('Error updating blog:', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} details</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>Added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
