import React, { useState, useEffect } from "react"
import axios from "axios"
import Blog from "./Blog"

const BlogList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs")
        setBlogs(response.data)
      } catch (error) {
        console.log("Error fetching blogs:", error)
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
      <button onClick={sortBlogsByLikes}>Sort by Likes</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
